<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <input v-model="appId" placeholder="APP_ID" required />
      <input v-model="appSecret" placeholder="APP_SECRET" required />
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const appId = ref('')
const appSecret = ref('')

const login = () => {
  console.log('Tentative de login avec', appId.value, appSecret.value)
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 100px auto;
  text-align: center;
}
input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 90%;
}
</style>
