<template>
  <section class="container" style="max-width: 720px; margin: 2rem auto;">
    <h1 class="mb-3">Count Book API (JSON)</h1>

    <p v-if="loading" class="text-muted">Loading…</p>
    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>

    <pre v-if="json" style="background:#f8fafc; padding:1rem; border-radius:.5rem; border:1px solid #e5e7eb;">
{{ json }}
    </pre>
  </section>
</template>

<script>
import axios from "axios";

const COUNT_URL = import.meta.env.VITE_COUNTBOOKS_URL;

export default {
  name: "CountBookAPI",
  data() {
    return {
      json: null,
      loading: false,
      errorMsg: "",
    };
  },
  mounted() {
    this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
      try {
        this.loading = true;
        this.errorMsg = "";
        const { data } = await axios.get(COUNT_URL);
        this.json = JSON.stringify(data, null, 2);
      } catch (e) {
        const msg = e?.response?.data ? JSON.stringify(e.response.data) : String(e);
        this.errorMsg = `Failed: ${msg}`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
