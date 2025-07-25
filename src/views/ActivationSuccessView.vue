<template>
  <div class="p-10 text-center font-satoshi bg-gray-50 min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold text-emerald-700">Compte activé avec succès !</h1>
    <p class="mt-4 text-gray-700">
      Vous pouvez désormais vous connecter à la plateforme avec vos identifiants.
      Ils vous ont été envoyés par mail.
    </p>
    <router-link
      to="/login"
      class="mt-6 inline-block text-emerald-700 font-semibold underline hover:text-emerald-600"
    >
      Se connecter
    </router-link>
  </div>
</template>
