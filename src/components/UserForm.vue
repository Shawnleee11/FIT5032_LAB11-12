<template>
  <section>
    <h2 class="mb-3">User Information Form (Week 3–4)</h2>
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <form class="card p-3" @submit.prevent="submitForm">
          <div class="mb-3">
            <label class="form-label" for="username">Username</label>
            <input id="username" class="form-control" v-model="formData.username"
                   required minlength="3" maxlength="32"
                   @blur="validateName(true)" @input="validateName(false)"/>
            <div v-if="errors.username" class="text-danger small mt-1">{{ errors.username }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label" for="password">Password</label>
            <input id="password" type="password" class="form-control" v-model="formData.password"
                   required @blur="validatePassword(true)" @input="validatePassword(false)"/>
            <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
          </div>

          <div class="mb-3 form-check">
            <input id="isAustralian" type="checkbox" class="form-check-input" v-model="formData.isAustralian">
            <label for="isAustralian" class="form-check-label">Australian Resident?</label>
          </div>

          <div class="mb-3">
            <label class="form-label" for="gender">Gender</label>
            <select id="gender" class="form-select" v-model="formData.gender" required>
              <option disabled value="">-- Select --</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label" for="reason">Reason for joining</label>
            <textarea id="reason" rows="3" class="form-control" v-model="formData.reason"
                      minlength="10" required
                      @blur="validateReason(true)" @input="validateReason(false)"></textarea>
            <div v-if="errors.reason" class="text-danger small mt-1">{{ errors.reason }}</div>
          </div>

          <div class="d-flex gap-2">
            <button class="btn btn-primary" type="submit">Submit</button>
            <button class="btn btn-secondary" type="button" @click="clearForm">Clear</button>
          </div>
        </form>

        <div class="mt-4">
          <h3 class="h5 mb-2">Submitted (PrimeVue DataTable)</h3>
          <DataTable :value="submitted" tableStyle="min-width: 40rem">
            <Column field="username" header="Username"></Column>
            <Column field="password" header="Password"></Column>
            <Column field="isAustralian" header="AU Resident" :body="boolBody"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="reason" header="Reason"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({ username: '', password: '', isAustralian: False, gender: '', reason: '' })
const submitted = ref([])
const errors = ref({ username: null, password: null, reason: null })

const validateName = (blur) => {
  const v = formData.value.username?.trim() || ''
  if (v.length < 3) { if (blur) errors.value.username = 'Name must be at least 3 characters' }
  else errors.value.username = null
}

const validatePassword = (blur) => {
  const p = formData.value.password || ''
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(p)
  const hasLowercase = /[a-z]/.test(p)
  const hasNumber = /\d/.test(p)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(p)
  const ok = p.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  if (!ok && blur) errors.value.password = 'Min 8, upper, lower, number, special'
  else if (ok) errors.value.password = null
}

const validateReason = (blur) => {
  const r = formData.value.reason?.trim() || ''
  if (r.length < 10 && blur) errors.value.reason = 'Please provide at least 10 characters'
  else if (r.length >= 10) errors.value.reason = null
}

const submitForm = () => {
  validateName(true); validatePassword(true); validateReason(true)
  if (errors.value.username || errors.value.password || errors.value.reason) return
  submitted.value.push({ ...formData.value })
  clearForm()
}

const clearForm = () => {
  formData.value = { username: '', password: '', isAustralian: false, gender: '', reason: '' }
  errors.value = { username: null, password: null, reason: null }
}

const boolBody = (row) => row.isAustralian ? 'Yes' : 'No'
</script>
