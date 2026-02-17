<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Crear Anuncio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="sell-content">
      <div class="sell-container">
        <!-- Progreso -->
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>

        <!-- Sección de imágenes -->
        <div class="section">
          <h3 class="section-title">
            <ion-icon :icon="imagesOutline"></ion-icon>
            Fotos del producto
          </h3>
          <div class="images-grid">
            <div v-for="(img, idx) in uploadedImages" :key="idx" class="image-item">
              <img :src="img" :alt="`Imagen ${idx + 1}`" class="uploaded-image" />
              <button type="button" class="remove-btn" @click="removeImage(idx)" title="Eliminar">
                <ion-icon :icon="closeCircleOutline"></ion-icon>
              </button>
            </div>
            <label class="image-upload-btn" v-if="uploadedImages.length < 5">
              <ion-icon :icon="addCircleOutline"></ion-icon>
              <span>Añadir foto ({{ uploadedImages.length }}/5)</span>
              <input type="file" multiple accept="image/*" @change="handleImageUpload" hidden />
            </label>
          </div>
          <p class="hint-text">Puedes subir hasta 5 imágenes. Primera imagen será la portada.</p>
        </div>

        <!-- Información básica -->
        <div class="section">
          <h3 class="section-title">
            <ion-icon :icon="documentTextOutline"></ion-icon>
            Información Básica
          </h3>

          <ion-item class="custom-item">
            <ion-label position="floating">Título del producto *</ion-label>
            <ion-input 
              v-model="formData.title" 
              placeholder="Ej: iPhone 13 Pro"
              @ionInput="updateProgress"
              required
            ></ion-input>
          </ion-item>

          <div class="text-counter">{{ formData.title.length }}/80 caracteres</div>

          <ion-item class="custom-item">
            <ion-label position="floating">Descripción *</ion-label>
            <ion-textarea 
              v-model="formData.description" 
              placeholder="Describe el estado, características, etc."
              :rows="4"
              @ionInput="updateProgress"
              required
            ></ion-textarea>
          </ion-item>

          <div class="text-counter">{{ formData.description.length }}/500 caracteres</div>
        </div>

        <!-- Categoría y detalles -->
        <div class="section">
          <h3 class="section-title">
            <ion-icon :icon="pricetag"></ion-icon>
            Categoría y Detalles
          </h3>

          <ion-item class="custom-item">
            <ion-label>Categoría *</ion-label>
            <ion-select v-model="formData.category" @ionChange="updateProgress">
              <ion-select-option value="Electrónica">📱 Electrónica</ion-select-option>
              <ion-select-option value="Deportes">⚽ Deportes</ion-select-option>
              <ion-select-option value="Moda">👕 Moda</ion-select-option>
              <ion-select-option value="Hogar">🏠 Hogar</ion-select-option>
              <ion-select-option value="Libros">📚 Libros</ion-select-option>
              <ion-select-option value="Vehículos">🚗 Vehículos</ion-select-option>
              <ion-select-option value="Juguetes">🎮 Juguetes</ion-select-option>
              <ion-select-option value="Otro">📦 Otro</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="custom-item">
            <ion-label>Condición *</ion-label>
            <ion-select v-model="formData.condition" @ionChange="updateProgress">
              <ion-select-option value="Nuevo">✨ Nuevo sin usar</ion-select-option>
              <ion-select-option value="Como nuevo">🆕 Como nuevo</ion-select-option>
              <ion-select-option value="Muy bueno">👍 Muy bueno</ion-select-option>
              <ion-select-option value="Bueno">✓ Bueno</ion-select-option>
              <ion-select-option value="Aceptable">⚠️ Aceptable</ion-select-option>
            </ion-select>
          </ion-item>

          <!-- Campos dinámicos por categoría -->
          <ion-item class="custom-item" v-if="formData.category === 'Electrónica'">
            <ion-label position="floating">Marca</ion-label>
            <ion-input v-model="formData.brand" placeholder="Ej: Apple, Samsung"></ion-input>
          </ion-item>

          <ion-item class="custom-item" v-if="formData.category === 'Electrónica'">
            <ion-label position="floating">Modelo</ion-label>
            <ion-input v-model="formData.model" placeholder="Ej: iPhone 13 Pro"></ion-input>
          </ion-item>

          <ion-item class="custom-item" v-if="formData.category === 'Moda'">
            <ion-label>Tamaño</ion-label>
            <ion-select v-model="formData.size">
              <ion-select-option value="">Selecciona tamaño</ion-select-option>
              <ion-select-option value="XS">XS</ion-select-option>
              <ion-select-option value="S">S</ion-select-option>
              <ion-select-option value="M">M</ion-select-option>
              <ion-select-option value="L">L</ion-select-option>
              <ion-select-option value="XL">XL</ion-select-option>
              <ion-select-option value="2XL">2XL</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="custom-item" v-if="formData.category === 'Vehículos'">
            <ion-label position="floating">Año del vehículo</ion-label>
            <ion-input v-model="formData.year" type="number" placeholder="2020"></ion-input>
          </ion-item>

          <ion-item class="custom-item" v-if="formData.category === 'Vehículos'">
            <ion-label position="floating">Kilómetros</ion-label>
            <ion-input v-model="formData.km" type="number" placeholder="150000"></ion-input>
          </ion-item>
        </div>

        <!-- Características y accesorios -->
        <div class="section" v-if="formData.category === 'Electrónica' || formData.category === 'Moda' || formData.category === 'Vehículos'">
          <h3 class="section-title">
            <ion-icon :icon="sparklesOutline"></ion-icon>
            Características Especiales
          </h3>

          <div class="checkbox-group">
            <ion-item v-if="formData.category === 'Electrónica'">
              <ion-label>Tiene caja original</ion-label>
              <ion-checkbox v-model="formData.hasBox" slot="end"></ion-checkbox>
            </ion-item>

            <ion-item v-if="formData.category === 'Electrónica'">
              <ion-label>Incluye accesorios</ion-label>
              <ion-checkbox v-model="formData.hasAccessories" slot="end"></ion-checkbox>
            </ion-item>

            <ion-item v-if="formData.category === 'Electrónica'">
              <ion-label>Incluye cargador original</ion-label>
              <ion-checkbox v-model="formData.hasCharger" slot="end"></ion-checkbox>
            </ion-item>

            <ion-item v-if="formData.category === 'Moda'">
              <ion-label>Nunca usado</ion-label>
              <ion-checkbox v-model="formData.neverWorn" slot="end"></ion-checkbox>
            </ion-item>

            <ion-item v-if="formData.category === 'Moda'">
              <ion-label>Tiene etiqueta original</ion-label>
              <ion-checkbox v-model="formData.hasTag" slot="end"></ion-checkbox>
            </ion-item>

            <ion-item v-if="formData.category === 'Vehículos'">
              <ion-label>Historial completo</ion-label>
              <ion-checkbox v-model="formData.hasHistory" slot="end"></ion-checkbox>
            </ion-item>

            <ion-item v-if="formData.category === 'Vehículos'">
              <ion-label>Revisión técnica al día</ion-label>
              <ion-checkbox v-model="formData.hasInspection" slot="end"></ion-checkbox>
            </ion-item>
          </div>

          <ion-item class="custom-item" v-if="formData.category === 'Electrónica'">
            <ion-label position="floating" style="padding-bottom: 30px;">Descripción de accesorios incluidos</ion-label>
            <ion-textarea 
              v-model="formData.accessories" 
              placeholder="Ej: Cable USB, auriculares, funda..."
              :rows="2"
            ></ion-textarea>
          </ion-item>
        </div>

        <!-- Garantía -->
        <div class="section" v-if="formData.category === 'Electrónica' || formData.category === 'Vehículos'">
          <h3 class="section-title">
            <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
            Garantía
          </h3>

          <ion-item class="custom-item">
            <ion-label>¿Tiene garantía?</ion-label>
            <ion-select v-model="formData.warranty">
              <ion-select-option value="no">Sin garantía</ion-select-option>
              <ion-select-option value="seller">Garantía del vendedor</ion-select-option>
              <ion-select-option value="manufacturer">Garantía del fabricante</ion-select-option>
              <ion-select-option value="extended">Garantía extendida</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="custom-item" v-if="formData.warranty !== 'no'">
            <ion-label position="floating">Duración de la garantía</ion-label>
            <ion-input v-model="formData.warrantyText" placeholder="Ej: 6 meses"></ion-input>
          </ion-item>
        </div>

        <!-- Precio y ubicación -->
        <div class="section">
          <h3 class="section-title">
            <ion-icon :icon="locationOutline"></ion-icon>
            Precio y Ubicación
          </h3>

          <div class="price-input-group">
            <div class="currency">€</div>
            <ion-item class="custom-item price-item">
              <ion-label position="floating" style="padding-bottom: 20px;">Precio *</ion-label>
              <ion-input 
                v-model="formData.price" 
                type="number" 
                placeholder="0.00"
                @ionInput="updateProgress"
                required
              ></ion-input>
            </ion-item>
          </div>

          <ion-item class="custom-item">
            <ion-label position="floating" style="padding-bottom: 20px;">Ubicación *</ion-label>
            <ion-input 
              v-model="formData.location" 
              placeholder="Ej: Madrid, Centro"
              @ionInput="updateProgress"
              required
            ></ion-input>
          </ion-item>

          <ion-item class="custom-item">
            <ion-label>Disponibilidad de envío</ion-label>
            <ion-select v-model="formData.shipping">
              <ion-select-option value="no">No envío</ion-select-option>
              <ion-select-option value="local">Solo recogida local</ion-select-option>
              <ion-select-option value="yes">Envío disponible</ion-select-option>
            </ion-select>
          </ion-item>
        </div>

        <!-- Etiquetas -->
        <div class="section">
          <h3 class="section-title">
            <ion-icon :icon="pricetag"></ion-icon>
            Etiquetas y Visibilidad
          </h3>

          <div class="tags-input-group">
            <div class="tags-display">
              <div v-for="tag in formData.tags" :key="tag" class="tag">
                {{ tag }}
                <button type="button" class="tag-remove" @click="removeTag(tag)">×</button>
              </div>
            </div>
            <div class="tag-input-wrapper">
              <ion-input 
                v-model="tagInput" 
                placeholder="Escribe etiqueta y presiona Enter"
                @keyup.enter="addTag"
              ></ion-input>
              <button type="button" class="add-tag-btn" @click="addTag" v-if="tagInput.trim()">
                <ion-icon :icon="addOutline"></ion-icon>
              </button>
            </div>
          </div>
          <p class="hint-text">Añade etiquetas para mejorar la visibilidad (máx 5)</p>

          <ion-item class="custom-item">
            <ion-label>¿Quieres promocionar este anuncio?</ion-label>
            <ion-checkbox v-model="formData.promoted" slot="end"></ion-checkbox>
          </ion-item>
        </div>

        <!-- Seguridad y preferencias -->
        <div class="section">
          <h3 class="section-title">
            <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
            Seguridad y Preferencias
          </h3>

          <ion-item class="custom-item">
            <ion-label>Tipo de transacción preferida</ion-label>
            <ion-select v-model="formData.transactionType">
              <ion-select-option value="any">Cualquiera</ion-select-option>
              <ion-select-option value="cash">Efectivo</ion-select-option>
              <ion-select-option value="transfer">Transferencia</ion-select-option>
              <ion-select-option value="both">Ambas</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="custom-item">
            <ion-label>
              <ion-checkbox v-model="formData.meetInPlace" slot="start"></ion-checkbox>
              Prefiero conocer al comprador en persona
            </ion-label>
          </ion-item>

          <ion-item class="custom-item">
            <ion-label>
              <ion-checkbox v-model="formData.canNegotiate" slot="start"></ion-checkbox>
              Acepto negociar el precio
            </ion-label>
          </ion-item>
        </div>

        <!-- Botones de acción -->
        <div class="action-buttons">
          <ion-button 
            expand="block" 
            type="button" 
            fill="outline" 
            @click="resetForm"
            class="cancel-btn"
          >
            <ion-icon slot="start" :icon="refreshOutline"></ion-icon>
            Limpiar
          </ion-button>

          <ion-button 
            expand="block" 
            type="submit" 
            color="success" 
            @click="submitSell"
            :disabled="!isFormValid"
            class="submit-btn"
          >
            <ion-icon slot="start" :icon="checkmarkDoneOutline"></ion-icon>
            Publicar Anuncio
          </ion-button>
        </div>

        <div class="info-box">
          <ion-icon :icon="informationCircleOutline"></ion-icon>
          <p>Tu anuncio será visible inmediatamente después de publicarlo. Puedes editarlo o eliminarlo en cualquier momento.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonCheckbox,
  toastController,
} from '@ionic/vue'
import {
  imagesOutline,
  closeCircleOutline,
  addCircleOutline,
  documentTextOutline,
  pricetag,
  locationOutline,
  refreshOutline,
  checkmarkDoneOutline,
  informationCircleOutline,
  sparklesOutline,
  shieldCheckmarkOutline,
  addOutline,
} from 'ionicons/icons'
import { useProductStore } from '@/stores/productStore'

interface FormData {
  title: string
  description: string
  price: string
  category: string
  condition: string
  brand: string
  model: string
  location: string
  phone: string
  shipping: string
  acceptChat: boolean
  size: string
  year: string
  km: string
  hasBox: boolean
  hasAccessories: boolean
  hasCharger: boolean
  neverWorn: boolean
  hasTag: boolean
  hasHistory: boolean
  hasInspection: boolean
  accessories: string
  warranty: string
  warrantyText: string
  tags: string[]
  promoted: boolean
  transactionType: string
  meetInPlace: boolean
  canNegotiate: boolean
}

const router = useRouter()
const store = useProductStore()

const formData = ref<FormData>({
  title: '',
  description: '',
  price: '',
  category: 'Electrónica',
  condition: 'Nuevo',
  brand: '',
  model: '',
  location: '',
  phone: '',
  shipping: 'local',
  acceptChat: true,
  size: '',
  year: '',
  km: '',
  hasBox: false,
  hasAccessories: false,
  hasCharger: false,
  neverWorn: false,
  hasTag: false,
  hasHistory: false,
  hasInspection: false,
  accessories: '',
  warranty: 'no',
  warrantyText: '',
  tags: [],
  promoted: false,
  transactionType: 'any',
  meetInPlace: true,
  canNegotiate: true,
})

const uploadedImages = ref<string[]>([])
const progressPercent = ref(0)
const tagInput = ref('')

// Validación del formulario
const isFormValid = computed(() => {
  return (
    formData.value.title.trim().length > 5 &&
    formData.value.description.trim().length > 10 &&
    formData.value.price &&
    parseFloat(formData.value.price) > 0 &&
    formData.value.location.trim().length > 0 &&
    uploadedImages.value.length > 0
  )
})

// Calcular progreso
const updateProgress = () => {
  let completed = 0
  const total = 6
  
  if (formData.value.title.length > 5) completed++
  if (formData.value.description.length > 10) completed++
  if (formData.value.price && parseFloat(formData.value.price) > 0) completed++
  if (formData.value.location.length > 0) completed++
  if (formData.value.location.length > 0) completed++
  if (uploadedImages.value.length > 0) completed++
  
  progressPercent.value = (completed / total) * 100
}

// Manejo de carga de imágenes
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files
  
  if (!files) return

  for (let i = 0; i < files.length && uploadedImages.value.length < 5; i++) {
    const file = files[i]
    
    if (!file.type.startsWith('image/')) {
      toastController
        .create({
          message: 'Solo se permiten archivos de imagen',
          duration: 2000,
          position: 'top',
          color: 'warning',
        })
        .then((toast) => toast.present())
      continue
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        uploadedImages.value.push(e.target.result as string)
        updateProgress()
      }
    }
    reader.readAsDataURL(file)
  }

  input.value = ''
}

// Eliminar imagen
const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1)
  updateProgress()
}

// Gestión de etiquetas
const addTag = () => {
  const tag = tagInput.value.trim().toLowerCase()
  if (tag && !formData.value.tags.includes(tag) && formData.value.tags.length < 5) {
    formData.value.tags.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (tag: string) => {
  const idx = formData.value.tags.indexOf(tag)
  if (idx > -1) {
    formData.value.tags.splice(idx, 1)
  }
}

// Enviar formulario
const submitSell = async () => {
  if (!isFormValid.value) {
    const toast = await toastController.create({
      message: 'Por favor completa todos los campos obligatorios',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  // Validación adicional
  if (formData.value.title.length < 6 || formData.value.title.length > 80) {
    const toast = await toastController.create({
      message: 'El título debe tener entre 6 y 80 caracteres',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  if (formData.value.description.length < 11 || formData.value.description.length > 500) {
    const toast = await toastController.create({
      message: 'La descripción debe tener entre 11 y 500 caracteres',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  // Crear objeto de producto con toda la información
  const newProduct = {
    title: formData.value.title,
    description: formData.value.description,
    price: parseFloat(formData.value.price),
    category: formData.value.category,
    condition: formData.value.condition,
    location: formData.value.location,
    image: uploadedImages.value[0] || '/placeholder.svg',
    images: uploadedImages.value.length > 0 ? uploadedImages.value : ['/placeholder.svg'],
    seller: 'Tu nombre',
    sellerId: 0,
    brand: formData.value.brand,
    model: formData.value.model,
    phone: formData.value.phone,
    shipping: formData.value.shipping,
    size: formData.value.size,
    year: formData.value.year,
    km: formData.value.km,
    hasBox: formData.value.hasBox,
    hasAccessories: formData.value.hasAccessories,
    hasCharger: formData.value.hasCharger,
    accessories: formData.value.accessories,
    warranty: formData.value.warranty,
    warrantyText: formData.value.warrantyText,
    tags: formData.value.tags,
    promoted: formData.value.promoted,
    canNegotiate: formData.value.canNegotiate,
  }

  store.addProduct(newProduct)

  const toast = await toastController.create({
    message: '✓ Anuncio publicado correctamente',
    duration: 2000,
    position: 'top',
    color: 'success',
    icon: checkmarkDoneOutline,
  })
  await toast.present()

  resetForm()
  setTimeout(() => router.push('/tabs/home'), 2000)
}

// Limpiar formulario
const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    price: '',
    category: 'Electrónica',
    condition: 'Nuevo',
    brand: '',
    model: '',
    location: '',
    phone: '',
    shipping: 'local',
    acceptChat: true,
    size: '',
    year: '',
    km: '',
    hasBox: false,
    hasAccessories: false,
    hasCharger: false,
    neverWorn: false,
    hasTag: false,
    hasHistory: false,
    hasInspection: false,
    accessories: '',
    warranty: 'no',
    warrantyText: '',
    tags: [],
    promoted: false,
    transactionType: 'any',
    meetInPlace: true,
    canNegotiate: true,
  }
  uploadedImages.value = []
  progressPercent.value = 0
  tagInput.value = ''
}
</script>

<style scoped>
.sell-content {
  --background: #f5f7fa;
}

.sell-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}

/* Barra de progreso */
.progress-bar {
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1a7f34 0%, #2ea043 100%);
  transition: width 0.3s ease;
  border-radius: 2px;
}

/* Secciones */
.section {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #1a1a1a;
}

.section-title ion-icon {
  color: #1a7f34;
  font-size: 20px;
}

/* Galería de imágenes */
.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.image-item {
  position: relative;
}

.uploaded-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e5e5e5;
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  color: #e74c3c;
}

.remove-btn:hover {
  transform: scale(1.1);
  background: #f8f8f8;
}

.remove-btn ion-icon {
  font-size: 18px;
}

.image-upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  border: 2px dashed #1a7f34;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(26, 127, 52, 0.03);
  min-height: 100px;
}

.image-upload-btn:hover {
  border-color: #2ea043;
  background: rgba(26, 127, 52, 0.08);
}

.image-upload-btn ion-icon {
  font-size: 32px;
  color: #1a7f34;
}

.image-upload-btn span {
  font-size: 12px;
  font-weight: 600;
  color: #1a7f34;
  text-align: center;
}

.hint-text {
  font-size: 12px;
  color: #999;
  margin: 8px 0 0 0;
}

/* Elementos del formulario */
.custom-item {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --highlight-height: 0;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  transition: all 0.2s ease;
}

.custom-item:focus-within {
  border-color: #1a7f34;
  box-shadow: 0 0 0 3px rgba(26, 127, 52, 0.1);
}

.text-counter {
  font-size: 11px;
  color: #999;
  margin: -8px 8px 8px 8px;
}

/* Precio */
.price-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #1a7f34;
  pointer-events: none;
}

.price-item {
  flex: 1;
}

.price-item ion-input {
  padding-left: 24px;
}

/* Checkboxes en grupo */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.checkbox-group ion-item {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  background: #f8f8f8;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 0;
  border: 1px solid #e5e5e5;
}

.checkbox-group ion-item:hover {
  background: #f0f0f0;
}

/* Etiquetas */
.tags-input-group {
  margin-bottom: 12px;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
  min-height: 28px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.tag-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 0;
  margin-left: 2px;
  transition: transform 0.1s;
}

.tag-remove:hover {
  transform: scale(1.2);
}

.tag-input-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.tag-input-wrapper ion-input {
  flex: 1;
  --padding-start: 12px;
  --padding-end: 12px;
  --border: 1px solid #e5e5e5;
  --border-radius: 8px;
  background: white;
}

.add-tag-btn {
  background: #1a7f34;
  color: white;
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-tag-btn:hover {
  background: #0f5223;
  transform: scale(1.05);
}

.add-tag-btn ion-icon {
  font-size: 20px;
}

/* Info box */
.info-box {
  background: rgba(26, 127, 52, 0.08);
  border: 1px solid rgba(26, 127, 52, 0.2);
  border-radius: 8px;
  padding: 12px 14px;
  margin: 16px 0;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: #0f5223;
}

.info-box ion-icon {
  font-size: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}

.info-box p {
  margin: 0;
  line-height: 1.4;
}

/* Botones de acción */
.action-buttons {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  padding-top: 16px;
  border-top: 1px solid #e5e5e5;
}

.cancel-btn {
  flex: 1;
  --background: white;
  --border-color: #e5e5e5;
  --color: #666;
}

.cancel-btn:hover {
  --background: #f8f8f8;
}

.submit-btn {
  flex: 1;
  --background: #1a7f34;
}

.submit-btn:disabled {
  --background: #ccc;
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 480px) {
  .sell-container {
    padding: 12px;
  }

  .section {
    padding: 12px;
    margin-bottom: 12px;
  }

  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
  }

  .uploaded-image {
    height: 80px;
  }

  .image-upload-btn {
    min-height: 80px;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .custom-item {
    margin-bottom: 10px;
  }

  .tag {
    font-size: 11px;
    padding: 5px 8px;
  }

  .tags-display {
    gap: 6px;
    min-height: 24px;
  }
}
</style>
