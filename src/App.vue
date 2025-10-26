<template>
  <div class="container py-4">
    <header class="mb-4 text-center">
      <h1 class="mb-2">Library Labs</h1>
      <p class="text-muted mb-0">Cloud Functions · Firestore · Vue</p>
    </header>

    <nav class="mb-4 d-flex gap-2 justify-content-center">
      <RouterLink class="btn btn-outline-primary" active-class="btn-primary text-white" to="/count">
        Book Counter
      </RouterLink>

      <RouterLink class="btn btn-outline-primary" active-class="btn-primary text-white" to="/add">
        Add Book
      </RouterLink>

      <RouterLink class="btn btn-outline-primary" active-class="btn-primary text-white" to="/WeatherCheck">
        Get Weather
      </RouterLink>

      <RouterLink class="btn btn-outline-primary" active-class="btn-primary text-white" to="/count-api">
        Count Book API
      </RouterLink>

      <RouterLink class="btn btn-outline-primary" active-class="btn-primary text-white" to="/books-api">
        GetAllBook API
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
</style>
