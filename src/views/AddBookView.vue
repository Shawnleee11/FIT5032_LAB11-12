<!-- src/views/AddBookView.vue -->
<template>
  <div class="container py-4">
    <h2 class="mb-3">Add Book</h2>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input v-model="title" type="text" class="form-control" placeholder="Book title" />
          </div>

          <div class="mb-3">
            <label class="form-label">Author</label>
            <input v-model="author" type="text" class="form-control" placeholder="Author name" />
          </div>

          <div class="mb-3">
            <label class="form-label">Year</label>
            <input v-model.number="year" type="number" class="form-control" placeholder="Year" />
          </div>

          <button class="btn btn-primary w-100" :disabled="loading">
            <span v-if="!loading">Submit</span>
            <span v-else>Submitting…</span>
          </button>
        </form>

        <div v-if="ok" class="alert alert-success mt-3">Submitted!</div>
        <div v-if="errMsg" class="alert alert-danger mt-3">{{ errMsg }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const ADD_URL = 'https://addbook-ngj7ssl3fa-uc.a.run.app'

const title = ref('')
const author = ref('')
const year = ref('')

const loading = ref(false)
const ok = ref(false)
const errMsg = ref('')

async function submit () {
  ok.value = false
  errMsg.value = ''

  if (!title.value || !author.value || !year.value) {
    errMsg.value = 'Please fill all fields'
    return
  }

  loading.value = true
  try {
    await axios.post(ADD_URL, {
      title: title.value,
      author: author.value,
      year: Number(year.value),
    })
    ok.value = true

    title.value = ''
    author.value = ''
    year.value = ''
  } catch (e) {
    errMsg.value = e?.response?.data?.error || e.message || 'Submit failed'
  } finally {
    loading.value = false
  }
}
</script>
