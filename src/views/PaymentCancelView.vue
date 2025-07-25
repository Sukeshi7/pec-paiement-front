<template>
  <div class="h-screen flex flex-col justify-center items-center bg-red-50 text-center px-4 font-satoshi">
    <h1 class="text-3xl font-bold text-red-700 mb-4">Paiement Annulé</h1>
    <p class="text-gray-700 text-lg">Votre paiement a été annulé ou a échoué.</p>
    <router-link
      to="/cart"
      class="mt-6 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition"
    >
      Revenir au panier
    </router-link>
  </div>
</template>
