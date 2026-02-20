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
                <h2 class="visual-title">ReMarket</h2>
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
                  <div class="stat-number">50K+</div>
                  <div class="stat-label">Productos</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                  <div class="stat-number">10K+</div>
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
                    v-model="formData.email"
                    type="email"
                    placeholder="Correo electrónico"
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

                <!-- Forgot password -->
                <div class="forgot-link">
                  <a @click="goToRestore">¿Olvidaste tu contraseña?</a>
                </div>

                <!-- Login button -->
                <button type="submit" class="login-button">
                  <span>Entrar</span>
                  <ion-icon :icon="arrowForward" class="button-icon"></ion-icon>
                </button>
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
import { IonPage, IonContent, IonIcon, alertController, toastController } from '@ionic/vue'
import {
  arrowForward,
  personOutline,
  mailOutline,
  lockClosedOutline,
} from 'ionicons/icons'

const router = useRouter()

const formData = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  if (!formData.value.email || !formData.value.password) {
    const toast = await toastController.create({
      message: 'Por favor, completa todos los campos',
      duration: 2000,
      position: 'top',
      color: 'warning',
    })
    await toast.present()
    return
  }
  // Simulación de login
  const user = {
    email: formData.value.email,
    name: formData.value.email.split('@')[0],
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
  router.push('/')
}

const goToRegister = () => {
  router.push('/register')
}
const goToRestore = () => {
  router.push('/restore-password')
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
  padding: 12px;
  position: relative;
  overflow: hidden;
}
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
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(100px, 100px) scale(1.1); }
}
@keyframes float2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-80px, -80px) rotate(90deg); }
}
@keyframes float3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(120px, -60px) scale(0.9); }
}
@keyframes float4 {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(-100px, 120px) scale(1.15) rotate(-45deg); }
}
@keyframes float5 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-150px, 100px); }
}
.login-wrapper {
  width: 100%;
  max-width: 400px;
  display: flex;
  animation: slideUp 0.6s ease-out;
  position: relative;
  z-index: 1;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.login-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 18px;
  padding: 18px 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
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
.login-button {
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
.login-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
.login-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 127, 52, 0.4);
}
.button-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}
.login-button:not(:disabled):hover .button-icon {
  transform: translateX(3px);
}
.login-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  font-size: 13px;
}
.login-links a {
  color: #1a7f34;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s ease;
}
.login-links a:hover {
  color: #0f5223;
  text-decoration: underline;
}
.login-links span {
  color: #bbb;
  font-weight: 400;
}
</style>