<template>
  <section>
    <h2 class="mb-3">Authors & Famous Works (Week 2)</h2>
    <div class="row g-3">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">All Authors</div>
          <ul class="list-group list-group-flush">
            <li
              v-for="a in authors"
              :key="a.id"
              class="list-group-item d-flex justify-content-between align-items-center"
              :class="{'bg-warning-subtle': a.name==='George Orwell'}"
            >
              <span>
                {{ a.name }} ({{ a.birthYear }})
                <small class="text-muted ms-2" v-if="a.name==='George Orwell'">highlighted via class/style binding</small>
              </span>
              <span class="badge bg-secondary">{{ a.famousWorks.length }} works</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Authors born after 1850 (computed)</div>
          <ul class="list-group list-group-flush">
            <li v-for="a in modernAuthors" :key="a.id" class="list-group-item">
              {{ a.name }} ({{ a.birthYear }})
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12">
        <div class="card mt-3">
          <div class="card-header">All Famous Works (computed · flatMap)</div>
          <ul class="list-group list-group-flush">
            <li v-for="(w, idx) in allFamousWorks" :key="idx" class="list-group-item">
              {{ w }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'
const modernAuthors = computed(() => authors.filter(a => a.birthYear > 1850))
const allFamousWorks = computed(() => authors.flatMap(a => a.famousWorks.map(w => w.title)))
</script>
