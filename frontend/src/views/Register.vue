<template>
  <ion-page>
    <ion-content class="register-content" :fullscreen="true">
      <div class="register-container">
        <!-- Fondo animado -->
        <div class="animated-background">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
        </div>

        <!-- Contenedor de dos columnas -->
        <div class="register-wrapper">
          <!-- Sección visual (solo desktop) -->
          <div class="visual-section">
            <div class="visual-content">
              <div class="visual-header">
                <div class="brand-logo">
                  <img src="/logo.png" alt="ReMarket Logo" class="brand-image">
                </div>
                <h2 class="visual-title">Únete a Remarket</h2>
                <p class="visual-tagline">Compra y vende con seguridad</p>
              </div>

              <div class="visual-features">
                <div class="visual-feature">
                  <div class="feature-icon-box">
                    <ion-icon :icon="checkmarkCircleOutline" class="feature-big-icon"></ion-icon>
                  </div>
                  <h3 class="feature-title">Registro rápido</h3>
                  <p class="feature-desc">Crea tu cuenta en menos de 2 minutos</p>
                </div>

                <div class="visual-feature">
                  <div class="feature-icon-box">
                    <ion-icon :icon="giftOutline" class="feature-big-icon"></ion-icon>
                  </div>
                  <h3 class="feature-title">100% Gratuito</h3>
                  <p class="feature-desc">Sin costos ocultos ni comisiones</p>
                </div>

                <div class="visual-feature">
                  <div class="feature-icon-box">
                    <ion-icon :icon="starOutline" class="feature-big-icon"></ion-icon>
                  </div>
                  <h3 class="feature-title">Beneficios exclusivos</h3>
                  <p class="feature-desc">Acceso a ofertas especiales</p>
                </div>
              </div>

              <div class="stats-section">
                <div class="stat-item">
                  <div class="stat-number">10K+</div>
                  <div class="stat-label">Usuarios</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                  <div class="stat-number">50K+</div>
                  <div class="stat-label">Productos</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                  <div class="stat-number">4.8★</div>
                  <div class="stat-label">Valoración</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección del formulario -->
          <div class="form-section-wrapper">
            <div class="register-box">
              <!-- Logo y título (solo móvil) -->
              <div class="header-section mobile-only">
                <div class="logo-container">
                  <ion-icon :icon="storefrontOutline" class="logo-icon"></ion-icon>
                </div>
                <h1 class="title">Crear cuenta</h1>
                <p class="subtitle">Únete a nuestra comunidad</p>
              </div>

              <!-- Título desktop -->
              <div class="header-section desktop-only">
                <h1 class="title">Crear cuenta</h1>
                <p class="subtitle">Completa tus datos para comenzar</p>
              </div>

              <!-- Formulario -->
              <form @submit.prevent="handleRegister" class="form-section">
                <!-- Nombre completo -->
                <div class="input-group">
                  <div class="input-icon">
                    <ion-icon :icon="personOutline"></ion-icon>
                  </div>
                  <input
                    v-model="formData.fullName"
                    type="text"
                    placeholder="Nombre completo"
                    class="custom-input"
                    required
                  />
                </div>

                <!-- Email -->
                <div class="input-group">
                  <div class="input-icon">
                    <ion-icon :icon="mailOutline"></ion-icon>
                  </div>
                  <input
                    v-model="formData.email"
                    type="email"
                    placeholder="Email"
                    class="custom-input"
                    required
                  />
                </div>

                <!-- Password -->
                <div class="input-group">
                  <div class="input-icon">
                    <ion-icon :icon="lockClosedOutline"></ion-icon>
                  </div>
                  <input
                    v-model="formData.password"
                    type="password"
                    placeholder="Contraseña"
                    class="custom-input"
                    required
                  />
                </div>

                <!-- Confirm Password -->
                <div class="input-group">
                  <div class="input-icon">
                    <ion-icon :icon="lockClosedOutline"></ion-icon>
                  </div>
                  <input
                    v-model="formData.confirmPassword"
                    type="password"
                    placeholder="Confirmar contraseña"
                    class="custom-input"
                    required
                  />
                </div>

                <!-- Terms -->
                <div class="terms-checkbox">
                  <ion-checkbox v-model="formData.acceptTerms" class="checkbox"></ion-checkbox>
                  <label class="terms-label">
                    Acepto los <a href="#" class="link">términos y condiciones</a>
                  </label>
                </div>

                <!-- Register button -->
                <button type="submit" class="register-button" :disabled="!formData.acceptTerms">
                  <span>Crear cuenta</span>
                  <ion-icon :icon="arrowForward" class="button-icon"></ion-icon>
                </button>

                <!-- Divider -->
                <div class="divider">
                  <span>o regístrate con</span>
                </div>

                <!-- Social button -->
                <div class="social-buttons">
                  <!-- Google button -->
                  <button type="button" @click="handleGoogleRegister" class="google-button">
                    <ion-icon :icon="logoGoogle" class="google-icon"></ion-icon>
                    <span class="button-text">Google</span>
                  </button>
                </div>

                <!-- Login link -->
                <div class="login-link">
                  <p>¿Ya tienes cuenta? <a @click="goToLogin">Iniciar sesión</a></p>
                </div>
              </form>

              <!-- Features (solo móvil) -->
              <div class="features mobile-only">
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span class="feature-text">Rápido</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🆓</span>
                  <span class="feature-text">Gratis</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">⭐</span>
                  <span class="feature-text">Beneficios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonContent,
  IonIcon,
  IonCheckbox,
  alertController,
  toastController,
} from '@ionic/vue'
import {
  arrowForward,
  personOutline,
  storefrontOutline,
  mailOutline,
  lockClosedOutline,
  checkmarkCircleOutline,
  giftOutline,
  starOutline,
  logoGoogle,
} from 'ionicons/icons'

const router = useRouter()

interface FormDataType {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

const formData = reactive<FormDataType>({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

const handleRegister = async () => {
  // Validar campos vacíos
  if (
    !formData.fullName ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    const toast = await toastController.create({
      message: 'Por favor completa todos los campos',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    const toast = await toastController.create({
      message: 'Por favor ingresa un email válido',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  // Validar longitud de contraseña
  if (formData.password.length < 6) {
    const toast = await toastController.create({
      message: 'La contraseña debe tener al menos 6 caracteres',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  // Validar que las contraseñas coincidan
  if (formData.password !== formData.confirmPassword) {
    const toast = await toastController.create({
      message: 'Las contraseñas no coinciden',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  // Validar términos y condiciones
  if (!formData.acceptTerms) {
    const toast = await toastController.create({
      message: 'Debes aceptar los términos y condiciones',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  // Registrar usuario
  const user = {
    fullName: formData.fullName,
    email: formData.email,
    name: formData.fullName.split(' ')[0],
    registerDate: new Date().toISOString(),
  }

  localStorage.setItem('user', JSON.stringify(user))

  const toast = await toastController.create({
    message: `¡Bienvenido ${user.name}! Cuenta creada exitosamente`,
    duration: 2500,
    position: 'top',
    color: 'success',
  })
  await toast.present()

  router.push('/')
}

const handleGoogleRegister = async () => {
  const alert = await alertController.create({
    header: '🔐 Registrarse con Google',
    message: 'Serás redirigido a la página de autenticación de Google para crear tu cuenta de forma segura.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'alert-button-cancel',
      },
      {
        text: 'Continuar',
        cssClass: 'alert-button-confirm',
        handler: () => {
          const toast = toastController.create({
            message: 'Redirigiendo a Google...',
            duration: 2000,
            position: 'top',
            color: 'primary',
            icon: logoGoogle,
          })
          toast.then((t) => t.present())
          
          setTimeout(async () => {
            const user = {
              email: 'usuario@gmail.com',
              fullName: 'Usuario Google',
              name: 'Usuario',
              registerDate: new Date().toISOString(),
              provider: 'google',
            }
            localStorage.setItem('user', JSON.stringify(user))
            
            const successToast = await toastController.create({
              message: '¡Registro exitoso con Google!',
              duration: 2000,
              position: 'top',
              color: 'success',
            })
            await successToast.present()
            router.push('/')
          }, 2000)
        },
      },
    ],
  })
  await alert.present()
}


const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-content {
  --background: #f0f4f8;
}

.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  position: relative;
  overflow: hidden;
}

/* Fondo animado */
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  top: -150px;
  left: -150px;
  animation: float1 20s infinite;
}

.shape-2 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #2ea043 0%, #1a7f34 100%);
  bottom: -100px;
  right: -100px;
  animation: float2 18s infinite;
}

.shape-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 100%);
  top: 50%;
  left: -150px;
  animation: float3 22s infinite;
}

.shape-4 {
  width: 450px;
  height: 450px;
  background: linear-gradient(135deg, #1a7f34 0%, rgba(26, 127, 52, 0.3) 100%);
  top: -200px;
  right: -200px;
  animation: float4 25s infinite;
}

.shape-5 {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(158, 219, 175, 0.4) 100%);
  bottom: -80px;
  left: 50%;
  animation: float5 19s infinite;
}

@keyframes float1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(100px, 100px) scale(1.1);
  }
}

@keyframes float2 {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(-80px, -80px) rotate(90deg);
  }
}

@keyframes float3 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(120px, -60px) scale(0.9);
  }
}

@keyframes float4 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  50% {
    transform: translate(-100px, 120px) scale(1.15) rotate(-45deg);
  }
}

@keyframes float5 {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-150px, 100px);
  }
}

.back-button {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(26, 127, 52, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(26, 127, 52, 0.4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.back-button:hover {
  background: rgba(26, 127, 52, 0.5);
  transform: translateX(-3px);
}

/* Contenedor principal */
.register-wrapper {
  width: 100%;
  max-width: 400px;
  display: flex;
  animation: slideUp 0.6s ease-out;
  position: relative;
  z-index: 1;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Sección visual (oculta en móvil) */
.visual-section {
  display: none;
}

/* Sección formulario */
.form-section-wrapper {
  width: 100%;
}

.register-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 18px;
  padding: 18px 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* Control de visibilidad móvil/desktop */
.mobile-only {
  display: block;
}

.desktop-only {
  display: none;
}

.header-section {
  text-align: center;
  margin-bottom: 16px;
}

.logo-container {
  width: 52px;
  height: 52px;
  margin: 0 auto 10px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(26, 127, 52, 0.3);
}

.logo-icon {
  font-size: 26px;
  color: white;
}

.title {
  font-size: 20px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 3px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 13px;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
  pointer-events: none;
  transition: color 0.3s ease;
}

.custom-input {
  width: 100%;
  padding: 10px 10px 10px 38px;
  border: 2px solid #e5e5e5;
  border-radius: 11px;
  font-size: 13.5px;
  color: #1a1a1a;
  background: #f8f8f8;
  transition: all 0.3s ease;
  outline: none;
  font-weight: 500;
}

.custom-input::placeholder {
  color: #999;
}

.custom-input:focus {
  border-color: #1a7f34;
  background: white;
  box-shadow: 0 0 0 4px rgba(26, 127, 52, 0.1);
}

.input-group:has(.custom-input:focus) .input-icon {
  color: #1a7f34;
}

.terms-checkbox {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 1px;
}

.checkbox {
  --size: 18px;
  --checkbox-background-checked: #1a7f34;
  --border-color-checked: #1a7f34;
}

.terms-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.link {
  color: #1a7f34;
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}

.register-button {
  width: 100%;
  padding: 11px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  color: white;
  border: none;
  border-radius: 11px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 127, 52, 0.3);
  margin-top: 2px;
}

.register-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.register-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 127, 52, 0.4);
}

.button-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.register-button:not(:disabled):hover .button-icon {
  transform: translateX(3px);
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 12px 0 10px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e5e5e5;
}

.divider span {
  padding: 0 12px;
  color: #999;
  font-size: 12px;
  font-weight: 600;
}

.social-buttons {
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 0;
}

.google-button {
  flex: 1;
  padding: 10px 8px;
  background: white;
  color: #444;
  border: 2px solid #e5e5e5;
  border-radius: 11px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 64px;
}

.google-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(66, 133, 244, 0.05) 0%, rgba(234, 67, 53, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.google-button:hover::before {
  opacity: 1;
}

.google-button:hover {
  border-color: #4285f4;
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.15);
}

.google-icon {
  font-size: 20px;
  color: #4285f4;
}

.button-text {
  font-size: 12px;
  white-space: nowrap;
}

.login-link {
  text-align: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e5e5e5;
}

.login-link p {
  margin: 0;
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.login-link a {
  color: #1a7f34;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #0f5223;
  text-decoration: underline;
}

.features {
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e5e5;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.feature-icon {
  font-size: 20px;
}

.feature-text {
  font-size: 11px;
  color: #666;
  font-weight: 600;
}

/* Estilos personalizados para alerts */
ion-alert .alert-button-confirm {
  color: #4285f4 !important;
  font-weight: 700 !important;
}

ion-alert .alert-button-cancel {
  color: #999 !important;
}

/* =========================
   ESTILOS DESKTOP (992px+)
   ========================= */
@media (min-width: 992px) {
  .register-container {
    padding: 40px;
  }

  .back-button {
    top: 32px;
    left: 32px;
    width: 48px;
    height: 48px;
  }

  .register-wrapper {
    max-width: 900px;
    height: 650px;
    flex-direction: row;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  /* Sección visual visible en desktop */
  .visual-section {
    display: flex;
    flex: 1;
    background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
    padding: 40px 32px;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .visual-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }

  .visual-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .visual-header {
    text-align: center;
  }

  .brand-logo {
    width: 68px;
    height: 68px;
    margin: 0 auto 12px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .brand-icon {
    font-size: 36px;
    color: white;
  }

  .visual-title {
    font-size: 30px;
    font-weight: 900;
    margin: 0 0 5px 0;
    letter-spacing: -1px;
  }

  .visual-tagline {
    font-size: 14px;
    margin: 0;
    opacity: 0.9;
    font-weight: 500;
  }

  .visual-features {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 20px 0;
  }

  .visual-feature {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .visual-feature:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }

  .feature-icon-box {
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .feature-big-icon {
    font-size: 24px;
    color: white;
  }

  .feature-title {
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 2px 0;
  }

  .feature-desc {
    font-size: 11px;
    margin: 0;
    opacity: 0.85;
  }

  .stats-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16px 12px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: 22px;
    font-weight: 900;
    margin-bottom: 2px;
  }

  .stat-label {
    font-size: 10px;
    opacity: 0.85;
    font-weight: 600;
  }

  .stat-divider {
    width: 1px;
    height: 30px;
    background: rgba(255, 255, 255, 0.3);
  }

  /* Sección formulario en desktop */
  .form-section-wrapper {
    flex: 0 0 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    background: white;
  }

  .register-box {
    background: transparent;
    backdrop-filter: none;
    box-shadow: none;
    padding: 0;
    max-width: 300px;
  }

  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: block;
  }

  .header-section {
    text-align: left;
    margin-bottom: 24px;
  }

  .title {
    font-size: 26px;
  }

  .subtitle {
    font-size: 13px;
  }

  .form-section {
    gap: 12px;
  }

  .custom-input {
    padding: 12px 14px 12px 44px;
    font-size: 13px;
  }

  .input-icon {
    left: 14px;
    font-size: 16px;
  }

  .register-button {
    padding: 13px;
    font-size: 14px;
  }

  .google-button {
    padding: 12px 8px;
    font-size: 12px;
    min-height: 72px;
  }

  .google-icon {
    font-size: 20px;
  }

  .button-text {
    font-size: 11px;
  }

  .divider {
    margin: 14px 0 12px;
  }

  .terms-label {
    font-size: 12px;
  }

  .checkbox {
    --size: 18px;
  }

  .button-icon {
    font-size: 16px;
  }
}

/* Tablets medianos */
@media (min-width: 769px) and (max-width: 991px) {
  .register-container {
    padding: 32px;
  }

  .back-button {
    top: 24px;
    left: 24px;
    width: 44px;
    height: 44px;
  }

  .register-wrapper {
    max-width: 500px;
  }

  .register-box {
    padding: 34px 28px;
    border-radius: 20px;
  }

  .logo-container {
    width: 72px;
    height: 72px;
    margin-bottom: 14px;
  }

  .logo-icon {
    font-size: 36px;
  }

  .title {
    font-size: 26px;
  }

  .subtitle {
    font-size: 14px;
  }

  .custom-input {
    padding: 12px 14px 12px 42px;
    font-size: 14px;
  }

  .google-button {
    min-height: 75px;
    font-size: 13px;
  }
}

/* Móvil grande */
@media (min-width: 425px) and (max-width: 768px) {
  .register-container {
    padding: 16px;
  }

  .register-wrapper {
    max-width: 100%;
  }

  .register-box {
    padding: 26px 20px;
    border-radius: 18px;
  }

  .logo-container {
    width: 60px;
    height: 60px;
    margin-bottom: 12px;
  }

  .logo-icon {
    font-size: 30px;
  }

  .title {
    font-size: 22px;
    margin: 0 0 3px 0;
  }

  .subtitle {
    font-size: 13px;
  }

  .custom-input {
    padding: 11px 12px 11px 40px;
    font-size: 14px;
  }

  .google-button {
    min-height: 72px;
    font-size: 12px;
    padding: 10px 6px;
  }

  .google-icon {
    font-size: 18px;
  }
}

/* Móvil pequeño */
@media (max-width: 424px) {
  .register-container {
    padding: 12px;
  }

  .back-button {
    top: 12px;
    left: 12px;
    width: 36px;
    height: 36px;
  }

  .register-box {
    padding: 16px 12px;
    border-radius: 16px;
  }

  .logo-container {
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
  }

  .logo-icon {
    font-size: 24px;
  }

  .title {
    font-size: 19px;
    margin: 0 0 2px 0;
  }

  .subtitle {
    font-size: 11px;
  }

  .header-section {
    margin-bottom: 14px;
  }

  .form-section {
    gap: 8px;
  }

  .custom-input {
    padding: 10px 10px 10px 36px;
    font-size: 13px;
    border-radius: 10px;
  }

  .input-icon {
    font-size: 16px;
    left: 12px;
  }

  .register-button {
    padding: 11px;
    font-size: 13px;
    border-radius: 10px;
  }

  .social-buttons {
    gap: 8px;
  }

  .google-button {
    padding: 10px 6px;
    min-height: 65px;
    font-size: 11px;
    border-radius: 10px;
  }

  .google-icon {
    font-size: 18px;
  }

  .button-text {
    font-size: 10px;
  }

  .terms-label {
    font-size: 11px;
  }

  .divider {
    margin: 8px 0 10px;
  }
}
</style>