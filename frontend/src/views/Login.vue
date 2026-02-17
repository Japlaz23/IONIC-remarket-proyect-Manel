<template>
  <ion-page>
    <ion-content class="login-content" :fullscreen="true">
      <div class="login-container">
        <!-- Fondo animado -->
        <div class="animated-background">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
        </div>

        <!-- Contenedor de dos columnas -->
        <div class="login-wrapper">
          <!-- Sección visual (solo desktop) -->
          <div class="visual-section">
            <div class="visual-content">
              <div class="visual-header">
                <div class="brand-logo">
                  <img src="/logo.png" alt="ReMarket Logo" class="brand-image">
                </div>
                <h2 class="visual-title">Remarket</h2>
                <p class="visual-tagline">Tu marketplace de confianza</p>
              </div>

              <div class="visual-features">
                <div class="visual-feature">
                  <div class="feature-icon-box">
                    <ion-icon :icon="cartOutline" class="feature-big-icon"></ion-icon>
                  </div>
                  <h3 class="feature-title">Compra fácil</h3>
                  <p class="feature-desc">Miles de productos de segunda mano</p>
                </div>

                <div class="visual-feature">
                  <div class="feature-icon-box">
                    <ion-icon :icon="pricetagOutline" class="feature-big-icon"></ion-icon>
                  </div>
                  <h3 class="feature-title">Vende rápido</h3>
                  <p class="feature-desc">Publica tus productos en minutos</p>
                </div>

                <div class="visual-feature">
                  <div class="feature-icon-box">
                    <ion-icon :icon="shieldCheckmarkOutline" class="feature-big-icon"></ion-icon>
                  </div>
                  <h3 class="feature-title">100% Seguro</h3>
                  <p class="feature-desc">Transacciones protegidas</p>
                </div>
              </div>

              <div class="stats-section">
                <div class="stat-item">
                  <div class="stat-number">10K+</div>
                  <div class="stat-label">Productos</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                  <div class="stat-number">5K+</div>
                  <div class="stat-label">Usuarios</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                  <div class="stat-number">98%</div>
                  <div class="stat-label">Satisfacción</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección del formulario -->
          <div class="form-section-wrapper">
            <div class="login-box">
              <!-- Logo y título (solo móvil) -->
              <div class="header-section mobile-only">
                <div class="logo-container">
                  <img src="/logo.png" alt="ReMarket Logo" class="logo-image">
                </div>
                <h1 class="title">Remarket</h1>
                <p class="subtitle">Compra y vende de forma fácil</p>
              </div>

              <!-- Título desktop -->
              <div class="header-section desktop-only">
                <h1 class="title">Bienvenido</h1>
                <p class="subtitle">Inicia sesión para continuar</p>
              </div>

              <!-- Formulario -->
              <form @submit.prevent="handleLogin" class="form-section">
                <!-- Email -->
                <div class="input-group">
                  <div class="input-icon">
                    <ion-icon :icon="mailOutline"></ion-icon>
                  </div>
                  <input
                    v-model="email"
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
                    v-model="password"
                    type="password"
                    placeholder="Contraseña"
                    class="custom-input"
                    required
                  />
                </div>

                <!-- Forgot password -->
                <div class="forgot-link">
                  <a @click="goToRestore">¿Olvidaste tu contraseña?</a>
                </div>

                <!-- Login button -->
                <button type="submit" class="login-button">
                  <span>Iniciar Sesión</span>
                  <ion-icon :icon="arrowForward" class="button-icon"></ion-icon>
                </button>

                <!-- Divider -->
                <div class="divider">
                  <span>o continúa con</span>
                </div>

                <!-- Social and Guest buttons -->
                <div class="social-buttons">
                  <!-- Google button -->
                  <button type="button" @click="handleGoogleLogin" class="google-button">
                    <ion-icon :icon="logoGoogle" class="google-icon"></ion-icon>
                    <span class="button-text">Google</span>
                  </button>

                  <!-- Guest button -->
                  <button type="button" @click="goHome" class="guest-button">
                    <ion-icon :icon="personOutline"></ion-icon>
                    <span class="button-text">Invitado</span>
                  </button>
                </div>

                <!-- Register link -->
                <div class="register-link">
                  <p>¿No tienes cuenta? <a @click="goToRegister">Crear cuenta</a></p>
                </div>
              </form>

              <!-- Features (solo móvil) -->
              <div class="features mobile-only">
                <div class="feature-item">
                  <span class="feature-icon">🔒</span>
                  <span class="feature-text">Seguro</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">⚡</span>
                  <span class="feature-text">Rápido</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">💚</span>
                  <span class="feature-text">Confiable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </ion-content>

    <ion-modal
      :is-open="showGoogleModal"
      css-class="google-auth-modal"
      :show-backdrop="true"
      :backdrop-dismiss="true"
      @didDismiss="closeGoogleModal"
    >
      <div class="google-modal-surface">
        <div class="google-modal-card">
          <div class="google-modal-header">
            <div class="google-modal-logo" aria-hidden="true">
              <svg viewBox="0 0 48 48" class="google-g" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.4l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6.1C12.2 13.6 17.6 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.1 24.5c0-1.7-.2-3.4-.5-5H24v9.5h12.3c-.5 2.7-2.1 5.1-4.6 6.7l7.3 5.6c4.3-4 6.8-9.8 6.8-16.8z"/>
                <path fill="#FBBC05" d="M10.4 28.7c-.6-1.7-1-3.4-1-5.2s.4-3.5 1-5.2l-7.8-6.1C1 15.4 0 19.1 0 23.5s1 8.1 2.6 11.3l7.8-6.1z"/>
                <path fill="#34A853" d="M24 48c6.2 0 11.5-2 15.4-5.4l-7.3-5.6c-2 1.3-4.6 2.1-8.1 2.1-6.4 0-11.8-4.1-13.7-9.9l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/>
              </svg>
            </div>
            <div>
              <h3 class="google-modal-title">Continuar con Google</h3>
              <p class="google-modal-subtitle">
                Seras redirigido a la pagina de autenticacion de Google para iniciar sesion.
              </p>
            </div>
          </div>

          <div class="google-modal-actions">
            <ion-button fill="clear" class="google-cancel" @click="closeGoogleModal">
              Cancelar
            </ion-button>
            <ion-button class="google-continue" @click="continueGoogleLogin">
              Continuar
            </ion-button>
          </div>
        </div>
      </div>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonContent, IonIcon, IonButton, IonModal, toastController } from '@ionic/vue'
import {
  arrowForward,
  personOutline,
  mailOutline,
  lockClosedOutline,
  cartOutline,
  pricetagOutline,
  shieldCheckmarkOutline,
  logoGoogle,
} from 'ionicons/icons'

const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()

const handleLogin = async () => {
  if (!email.value || !password.value) {
    const toast = await toastController.create({
      message: 'Por favor completa todos los campos',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    const toast = await toastController.create({
      message: 'Por favor ingresa un email válido',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }

  const user = {
    email: email.value,
    name: email.value.split('@')[0],
    loginDate: new Date().toISOString(),
  }

  localStorage.setItem('user', JSON.stringify(user))

  const toast = await toastController.create({
    message: `¡Bienvenido ${user.name}!`,
    duration: 2000,
    position: 'top',
    color: 'success',
  })
  await toast.present()

  router.push('/tabs/home')
}

const goHome = () => {
  router.push('/tabs/home')
}

const goToRestore = () => {
  router.push('/restorepassword')
}

const goToRegister = () => {
  router.push('/register')
}

const showGoogleModal = ref(false)

const handleGoogleLogin = () => {
  showGoogleModal.value = true
}

const closeGoogleModal = () => {
  showGoogleModal.value = false
}

const continueGoogleLogin = async () => {
  closeGoogleModal()

  const toast = await toastController.create({
    message: 'Redirigiendo a Google...',
    duration: 2000,
    position: 'top',
    color: 'primary',
    icon: logoGoogle,
  })
  await toast.present()

  setTimeout(async () => {
    const user = {
      email: 'usuario@gmail.com',
      name: 'Usuario Google',
      loginDate: new Date().toISOString(),
      provider: 'google',
    }
    localStorage.setItem('user', JSON.stringify(user))

    const successToast = await toastController.create({
      message: '¡Inicio de sesión exitoso con Google!',
      duration: 2000,
      position: 'top',
      color: 'success',
    })
    await successToast.present()
    router.push('/tabs/home')
  }, 2000)
}
</script>

<style scoped>
.login-content {
  --background: #f0f4f8;
}

.login-container {
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

/* Contenedor principal */
.login-wrapper {
  width: 100%;
  max-width: 420px;
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

.login-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px 18px;
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
  margin-bottom: 20px;
}

.logo-container {
  width: 60px;
  height: 60px;
  margin: 0 auto 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(26, 127, 52, 0.3);
  overflow: hidden;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.title {
  font-size: 22px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 12px;
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

.forgot-link {
  text-align: right;
  margin-top: -6px;
}

.forgot-link a {
  font-size: 13px;
  color: #1a7f34;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.forgot-link a:hover {
  color: #0f5223;
}

.login-button {
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

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 127, 52, 0.4);
}

.button-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.login-button:hover .button-icon {
  transform: translateX(3px);
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e5e5e5;
}

.divider span {
  padding: 0 14px;
  color: #999;
  font-size: 13px;
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
  padding: 13px 8px;
  background: white;
  color: #444;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 80px;
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
  font-size: 24px;
  color: #4285f4;
}

.guest-button {
  flex: 1;
  padding: 13px 8px;
  background: white;
  color: #666;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
  min-height: 80px;
}

.guest-button:hover {
  border-color: #ccc;
  background: #f8f8f8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.guest-button ion-icon {
  font-size: 24px;
}

.button-text {
  font-size: 13px;
  white-space: nowrap;
}

.register-link {
  text-align: center;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #e5e5e5;
}

.register-link p {
  margin: 0;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.register-link a {
  color: #1a7f34;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #0f5223;
  text-decoration: underline;
}

.features {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e5e5;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.feature-icon {
  font-size: 22px;
}

.feature-text {
  font-size: 12px;
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
  .login-container {
    padding: 32px;
  }

  .back-button {
    top: 24px;
    left: 24px;
    width: 44px;
    height: 44px;
  }

  .login-wrapper {
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
    width: 70px;
    height: 70px;
    margin: 0 auto 14px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.brand-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
    margin: 0;
    opacity: 0.9;
    font-weight: 500;
  }

  .visual-features {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin: 24px 0;
  }

  .visual-feature {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .visual-feature:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }

  .feature-icon-box {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .feature-big-icon {
    font-size: 26px;
    color: white;
  }

  .feature-title {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 2px 0;
  }

  .feature-desc {
    font-size: 12px;
    margin: 0;
    opacity: 0.85;
  }

  .stats-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 18px 14px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: 24px;
    font-weight: 900;
    margin-bottom: 2px;
  }

  .stat-label {
    font-size: 11px;
    opacity: 0.85;
    font-weight: 600;
  }

  .stat-divider {
    width: 1px;
    height: 34px;
    background: rgba(255, 255, 255, 0.3);
  }

  /* Sección formulario en desktop */
  .form-section-wrapper {
    flex: 0 0 380px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    background: white;
  }

  .login-box {
    background: transparent;
    backdrop-filter: none;
    box-shadow: none;
    padding: 0;
    max-width: 320px;
  }

  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: block;
  }

  .header-section {
    text-align: left;
    margin-bottom: 26px;
  }

  .title {
    font-size: 28px;
  }

  .subtitle {
    font-size: 14px;
  }

  .form-section {
    gap: 14px;
  }

  .custom-input {
    padding: 13px 16px 13px 46px;
    font-size: 14px;
  }

  .input-icon {
    left: 16px;
    font-size: 18px;
  }

  .login-button {
    padding: 15px;
    font-size: 15px;
  }

  .google-button {
    padding: 14px 10px;
    font-size: 14px;
    min-height: 80px;
  }

  .google-icon {
    font-size: 22px;
  }

  .guest-button {
    padding: 14px 10px;
    font-size: 14px;
    min-height: 80px;
  }

  .guest-button ion-icon {
    font-size: 22px;
  }

  .button-text {
    font-size: 13px;
  }

  .divider {
    margin: 18px 0 14px;
  }
}

/* Tablets medianos */
@media (min-width: 769px) and (max-width: 991px) {
  .login-container {
    padding: 32px;
  }

  .back-button {
    top: 24px;
    left: 24px;
    width: 44px;
    height: 44px;
  }

  .login-wrapper {
    max-width: 500px;
  }

  .login-box {
    padding: 36px 32px;
    border-radius: 22px;
  }

  .logo-container {
    width: 76px;
    height: 76px;
    margin-bottom: 14px;
  }

  .logo-icon {
    font-size: 38px;
  }

  .title {
    font-size: 28px;
  }

  .subtitle {
    font-size: 14px;
  }

  .custom-input {
    padding: 14px 16px 14px 48px;
    font-size: 15px;
  }

  .google-button,
  .guest-button {
    min-height: 85px;
    font-size: 14px;
  }
}

/* Móvil grande */
@media (min-width: 425px) and (max-width: 768px) {
  .login-container {
    padding: 16px;
  }

  .login-wrapper {
    max-width: 100%;
  }

  .login-box {
    padding: 28px 22px;
    border-radius: 18px;
  }

  .logo-container {
    width: 64px;
    height: 64px;
    margin-bottom: 12px;
  }

  .logo-icon {
    font-size: 32px;
  }

  .title {
    font-size: 24px;
    margin: 0 0 4px 0;
  }

  .subtitle {
    font-size: 13px;
  }

  .header-section {
    margin-bottom: 22px;
  }

  .custom-input {
    padding: 12px 13px 12px 42px;
    font-size: 14px;
  }

  .google-button,
  .guest-button {
    min-height: 78px;
    font-size: 13px;
  }

  .google-icon,
  .guest-button ion-icon {
    font-size: 22px;
  }
}

/* Móvil pequeño */
@media (max-width: 424px) {
  .login-container {
    padding: 12px;
  }

  .back-button {
    top: 12px;
    left: 12px;
    width: 36px;
    height: 36px;
  }

  .login-box {
    padding: 20px 14px;
    border-radius: 16px;
  }

  .logo-container {
    width: 54px;
    height: 54px;
    margin-bottom: 10px;
  }

  .logo-icon {
    font-size: 26px;
  }

  .title {
    font-size: 20px;
    margin: 0 0 3px 0;
  }

  .subtitle {
    font-size: 11px;
  }

  .header-section {
    margin-bottom: 16px;
  }

  .form-section {
    gap: 10px;
  }

  .custom-input {
    padding: 11px 12px 11px 38px;
    font-size: 14px;
    border-radius: 10px;
  }

  .login-button {
    padding: 12px;
    font-size: 14px;
    border-radius: 10px;
  }

  .social-buttons {
    gap: 8px;
  }

  .google-button,
  .guest-button {
    padding: 10px 6px;
    min-height: 70px;
    font-size: 12px;
    border-radius: 10px;
  }

  .google-icon,
  .guest-button ion-icon {
    font-size: 20px;
  }

  .button-text {
    font-size: 11px;
  }

  .features {
    margin-top: 12px;
    padding-top: 12px;
    gap: 8px;
  }

  .feature-item {
    gap: 3px;
  }

  .feature-icon {
    font-size: 18px;
  }

  .feature-text {
    font-size: 10px;
  }
}
</style>