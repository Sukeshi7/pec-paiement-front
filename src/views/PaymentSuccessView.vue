<template>
  <div class="h-screen flex flex-col justify-center items-center bg-emerald-50 text-center px-4 font-satoshi">
    <h1 class="text-3xl font-bold text-emerald-700 mb-4">Paiement Réussi !</h1>
    <p class="text-emerald-800 text-lg">Merci pour votre achat. Votre commande est en cours de traitement.</p>
    <router-link
      to="/product"
      class="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition"
    >
      Retour à la boutique
    </router-link>
  </div>
</template>
