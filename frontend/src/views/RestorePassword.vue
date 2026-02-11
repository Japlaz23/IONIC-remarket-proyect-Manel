<template>
  <ion-page>
    <ion-content class="restore-content" :fullscreen="true">
      <div class="restore-container">
        <!-- Fondo animado -->
        <div class="animated-background">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
        </div>

        <!-- Contenedor -->
        <div class="restore-wrapper">
          <!-- Botón volver -->
          <button class="back-button" @click="goBack">
            <ion-icon :icon="arrowBack"></ion-icon>
          </button>

          <!-- Caja de recuperación -->
          <div class="restore-box">
            <!-- Header -->
            <div class="header-section">
              <div class="logo-container">
                <ion-icon :icon="lockOpenOutline" class="logo-icon"></ion-icon>
              </div>
              <h1 class="title">{{ currentStep === 'email' ? 'Recuperar Contraseña' : 'Nueva Contraseña' }}</h1>
              <p class="subtitle">
                {{ currentStep === 'email'
                  ? 'Ingresa tu email para recuperar tu contraseña'
                  : 'Crea una nueva contraseña segura' }}
              </p>
            </div>

            <!-- Formulario - Paso 1: Email -->
            <form v-if="currentStep === 'email'" @submit.prevent="handleEmailSubmit" class="form-section">
              <div class="input-group">
                <div class="input-icon">
                  <ion-icon :icon="mailOutline"></ion-icon>
                </div>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="Ingresa tu email"
                  class="custom-input"
                  required
                />
              </div>

              <button type="submit" class="restore-button">
                <span>Enviar Código</span>
                <ion-icon :icon="arrowForward" class="button-icon"></ion-icon>
              </button>

              <p class="helper-text">
                Te enviaremos un código de verificación a tu email
              </p>
            </form>

            <!-- Formulario - Paso 2: Código -->
            <form v-if="currentStep === 'code'" @submit.prevent="handleCodeSubmit" class="form-section">
              <div class="input-group">
                <div class="input-icon">
                  <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
                </div>
                <input
                  v-model="formData.code"
                  type="text"
                  placeholder="Código de 6 dígitos"
                  class="custom-input"
                  maxlength="6"
                  required
                />
              </div>

              <button type="submit" class="restore-button">
                <span>Verificar Código</span>
                <ion-icon :icon="arrowForward" class="button-icon"></ion-icon>
              </button>

              <p class="helper-text">
                Revisa tu email y copia el código que te enviamos
              </p>

              <div class="retry-link">
                <a @click="goBack">No recibiste el código?</a>
              </div>
            </form>

            <!-- Formulario - Paso 3: Nueva Contraseña -->
            <form v-if="currentStep === 'password'" @submit.prevent="handlePasswordSubmit" class="form-section">
              <div class="input-group">
                <div class="input-icon">
                  <ion-icon :icon="lockClosedOutline"></ion-icon>
                </div>
                <input
                  v-model="formData.newPassword"
                  type="password"
                  placeholder="Nueva contraseña"
                  class="custom-input"
                  required
                />
              </div>

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

              <div class="password-strength">
                <div class="strength-bar">
                  <div :class="['strength-fill', passwordStrength]"></div>
                </div>
                <p class="strength-text">{{ getPasswordStrengthText() }}</p>
              </div>

              <button
                type="submit"
                class="restore-button"
                :disabled="formData.newPassword.length < 6"
              >
                <span>Cambiar Contraseña</span>
                <ion-icon :icon="arrowForward" class="button-icon"></ion-icon>
              </button>
            </form>

            <!-- Link de login -->
            <div class="login-link">
              <p>¿Recordaste tu contraseña? <a @click="goToLogin">Inicia sesión</a></p>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonContent,
  IonIcon,
  toastController,
} from '@ionic/vue'
import {
  arrowBack,
  arrowForward,
  mailOutline,
  lockClosedOutline,
  lockOpenOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons'

const router = useRouter()

type Step = 'email' | 'code' | 'password'

const currentStep = ref<Step>('email')

interface FormDataType {
  email: string
  code: string
  newPassword: string
  confirmPassword: string
}

const formData = reactive<FormDataType>({
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
})

const passwordStrength = computed(() => {
  const pwd = formData.newPassword
  let strength = 'weak'

  if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
    strength = 'strong'
  } else if (pwd.length >= 6 && /[0-9]/.test(pwd)) {
    strength = 'medium'
  }

  return strength
})

const getPasswordStrengthText = () => {
  switch (passwordStrength.value) {
    case 'strong':
      return '✓ Contraseña fuerte'
    case 'medium':
      return '◐ Contraseña media'
    default:
      return '◯ Contraseña débil'
  }
}

const handleEmailSubmit = async () => {
  if (!formData.email) {
    const toast = await toastController.create({
      message: 'Por favor ingresa tu email',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

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

  const toast = await toastController.create({
    message: `Código enviado a ${formData.email}`,
    duration: 2000,
    position: 'top',
    color: 'success',
  })
  await toast.present()

  currentStep.value = 'code'
}

const handleCodeSubmit = async () => {
  if (!formData.code) {
    const toast = await toastController.create({
      message: 'Por favor ingresa el código',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  if (formData.code.length !== 6) {
    const toast = await toastController.create({
      message: 'El código debe tener 6 dígitos',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  const toast = await toastController.create({
    message: 'Código verificado correctamente',
    duration: 2000,
    position: 'top',
    color: 'success',
  })
  await toast.present()

  currentStep.value = 'password'
}

const handlePasswordSubmit = async () => {
  if (formData.newPassword !== formData.confirmPassword) {
    const toast = await toastController.create({
      message: 'Las contraseñas no coinciden',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  if (formData.newPassword.length < 6) {
    const toast = await toastController.create({
      message: 'La contraseña debe tener al menos 6 caracteres',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  const toast = await toastController.create({
    message: 'Contraseña cambiad exitosamente',
    duration: 2000,
    position: 'top',
    color: 'success',
  })
  await toast.present()

  router.push('/login')
}

const goBack = () => {
  if (currentStep.value === 'email') {
    router.back()
  } else if (currentStep.value === 'code') {
    currentStep.value = 'email'
  } else {
    currentStep.value = 'code'
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.restore-content {
  --background: #f0f4f8;
}

.restore-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
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

.restore-wrapper {
  width: 100%;
  max-width: 420px;
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

.restore-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.header-section {
  text-align: center;
  margin-bottom: 28px;
}

.logo-container {
  width: 70px;
  height: 70px;
  margin: 0 auto 14px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(26, 127, 52, 0.3);
}

.logo-icon {
  font-size: 36px;
  color: white;
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  pointer-events: none;
  transition: color 0.3s ease;
}

.custom-input {
  width: 100%;
  padding: 13px 14px 13px 44px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  font-size: 15px;
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

.helper-text {
  text-align: center;
  font-size: 13px;
  color: #999;
  margin: 8px 0 0 0;
  font-weight: 500;
}

.restore-button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 127, 52, 0.3);
  margin-top: 6px;
}

.restore-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 127, 52, 0.4);
}

.restore-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.restore-button:hover:not(:disabled) .button-icon {
  transform: translateX(3px);
}

.password-strength {
  margin: 8px 0;
}

.strength-bar {
  width: 100%;
  height: 6px;
  background: #e5e5e5;
  border-radius: 3px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  width: 0;
  transition: width 0.3s ease, background-color 0.3s ease;
  border-radius: 3px;

  &.weak {
    width: 33%;
    background: #ff5252;
  }

  &.medium {
    width: 66%;
    background: #ffa726;
  }

  &.strong {
    width: 100%;
    background: #66bb6a;
  }
}

.strength-text {
  font-size: 12px;
  color: #666;
  margin: 4px 0 0 0;
  font-weight: 500;
}

.retry-link {
  text-align: center;
  margin-top: 12px;
}

.retry-link a {
  font-size: 12px;
  color: #1a7f34;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
}

.retry-link a:hover {
  color: #0f5223;
  text-decoration: underline;
}

.login-link {
  text-align: center;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #e5e5e5;
}

.login-link p {
  margin: 0;
  font-size: 14px;
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

@media (min-width: 769px) {
  .restore-container {
    padding: 32px;
  }

  .back-button {
    top: 24px;
    left: 24px;
    width: 44px;
    height: 44px;
  }

  .restore-wrapper {
    max-width: 500px;
  }

  .restore-box {
    padding: 40px 32px;
    border-radius: 24px;
  }

  .logo-container {
    width: 80px;
    height: 80px;
    margin-bottom: 16px;
  }

  .logo-icon {
    font-size: 40px;
  }

  .title {
    font-size: 32px;
  }

  .subtitle {
    font-size: 15px;
  }
}

@media (max-width: 375px) {
  .restore-container {
    padding: 12px;
  }

  .back-button {
    top: 12px;
    left: 12px;
    width: 36px;
    height: 36px;
  }

  .restore-box {
    padding: 28px 20px;
    border-radius: 18px;
  }

  .logo-container {
    width: 64px;
    height: 64px;
  }

  .logo-icon {
    font-size: 32px;
  }

  .title {
    font-size: 26px;
  }
}
</style>
