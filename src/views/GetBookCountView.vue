<template>
  <section style="max-width: 560px; margin: 2rem auto;">
    <h1>Book Counter</h1>

    <button @click="getCount">Get Book Count</button>

    <p v-if="count !== null" style="margin-top: 1rem;">
      Total number of books: {{ count }}
    </p>
    <p v-else-if="error" style="color:crimson; margin-top: 1rem;">
      error: {{ error }}
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const FN_URL = 'https://us-central1-lab9-971b8.cloudfunctions.net/countBooks'

const count = ref(null)
const error = ref('')

async function getCount () {
  count.value = null
  error.value = ''
  try {
    const { data } = await axios.get(FN_URL, { timeout: 8000 })
    if (typeof data?.count === 'number') {
      count.value = data.count
    } else {
      error.value = JSON.stringify(data)
    }
  } catch (e) {
    error.value = e?.response?.data?.error || e.message
  }
}
</script>
