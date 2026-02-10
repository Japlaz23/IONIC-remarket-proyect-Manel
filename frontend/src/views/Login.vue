<template>
  <ion-page>
    <ion-content class="login-content" :fullscreen="true">
      <div class="login-container">
        <!-- Botón de regreso flotante -->
        <button @click="goHome" class="back-button">
          <ion-icon :icon="arrowBack" class="text-xl"></ion-icon>
        </button>

        <!-- Contenedor principal con glassmorphism -->
        <div class="login-box">
          <!-- Logo y título -->
          <div class="header-section">
            <div class="logo-container">
              <ion-icon :icon="storefrontOutline" class="logo-icon"></ion-icon>
            </div>
            <h1 class="title">Remarket</h1>
            <p class="subtitle">Compra y vende de forma fácil</p>
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
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <!-- Login button -->
            <button type="submit" class="login-button">
              <span>Iniciar Sesión</span>
              <ion-icon :icon="arrowForward" class="button-icon"></ion-icon>
            </button>

            <!-- Divider -->
            <div class="divider">
              <span>o</span>
            </div>

            <!-- Guest button -->
            <button type="button" @click="goHome" class="guest-button">
              <ion-icon :icon="personOutline" class="mr-2"></ion-icon>
              Continuar como invitado
            </button>

            <!-- Register link -->
            <div class="register-link">
              <p>¿No tienes cuenta? <a @click="goToRegister">Crear cuenta</a></p>
            </div>
          </form>

          <!-- Features -->
          <div class="features">
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
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  IonPage,
  IonContent,
  IonIcon,
  alertController,
  toastController,
} from '@ionic/vue'
import {
  arrowBack,
  arrowForward,
  personOutline,
  storefrontOutline,
  mailOutline,
  lockClosedOutline,
} from 'ionicons/icons'

const email = ref('')
const password = ref('')
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

  router.push('/')
}

const goHome = () => {
  router.push('/')
}

const goToRegister = async () => {
  const alert = await alertController.create({
    header: 'Próximamente',
    message: 'La página de registro estará disponible pronto.',
    buttons: ['OK'],
  })
  await alert.present()
}
</script>

<style scoped>
.login-content {
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-3px);
}

.login-box {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
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

.header-section {
  text-align: center;
  margin-bottom: 32px;
}

.logo-container {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #1a7f34 0%, #0f5223 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(26, 127, 52, 0.3);
}

.logo-icon {
  font-size: 40px;
  color: white;
}

.title {
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 15px;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 20px;
  pointer-events: none;
  transition: color 0.3s ease;
}

.custom-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
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

.custom-input:focus + .input-icon {
  color: #1a7f34;
}

.input-group:has(.custom-input:focus) .input-icon {
  color: #1a7f34;
}

.forgot-link {
  text-align: right;
  margin-top: -8px;
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
  padding: 16px;
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
  margin-top: 8px;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 127, 52, 0.4);
}

.login-button:active {
  transform: translateY(0);
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
  margin: 24px 0 16px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e5e5e5;
}

.divider span {
  padding: 0 16px;
  color: #999;
  font-size: 13px;
  font-weight: 600;
}

.guest-button {
  width: 100%;
  padding: 14px;
  background: white;
  color: #666;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.guest-button:hover {
  border-color: #ccc;
  background: #f8f8f8;
}

.register-link {
  text-align: center;
  margin-top: 16px;
  padding-top: 16px;
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
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e5e5;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.feature-icon {
  font-size: 24px;
}

.feature-text {
  font-size: 12px;
  color: #666;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 480px) {
  .login-box {
    padding: 32px 24px;
  }
  
  .title {
    font-size: 28px;
  }
}
</style>
