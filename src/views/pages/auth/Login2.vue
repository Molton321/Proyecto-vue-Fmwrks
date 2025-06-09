<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/Auth';
import type { User } from '@/models/User';
import router from '@/router';

const authStore = useAuthStore();
const user = ref<User>({ email: '', password: '' });

function decodeJwt(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch (e) {
    return null;
  }
}

// Maneja la respuesta de Google
function handleCredentialResponse(response: any) {
  const decoded = decodeJwt(response.credential);
  if (decoded) {
    localStorage.setItem('user', JSON.stringify(decoded));
    router.push('/');
  } else {
    alert('Error al procesar la respuesta de Google');
  }
}

onMounted(() => {
  // @ts-ignore
  if (window.google && window.google.accounts && window.google.accounts.id) {
    // @ts-ignore
    window.google.accounts.id.initialize({
      client_id: '295456302918-vv5kvp39q82c1joq8m6l04fjqetrpnt9.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    // @ts-ignore
    window.google.accounts.id.renderButton(
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large' }
    );
  }
});

const handleLogin = async () => {
    try {
        await authStore.login(user.value);
    } catch (error) {
        alert(error.message);
    }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="user.email"
          type="email"
          placeholder="Email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="user.password"
          type="password"
          placeholder="Contraseña"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          class="w-full py-2 font-semibold text-white bg-primary rounded hover:bg-primary-600 transition"
        >
          Ingresar
        </button>
      </form>
      <div class="mt-6 flex justify-center">
        <div id="google-button"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
}
</style>
