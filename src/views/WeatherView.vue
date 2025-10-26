<template>
  <section class="wx-wrap">
    <h1 class="wx-title">WEATHER APP</h1>

    <!-- 输入 + 搜索按钮 -->
    <div class="wx-search">
      <input
        v-model="city"
        class="wx-input"
        type="text"
        placeholder="Enter city name"
        @keyup.enter="searchByCity"
      />
      <button class="wx-btn" @click="searchByCity">Search</button>
    </div>

    <!-- Weather display-->
    <main v-if="weatherData" class="wx-main">
      <h2 class="wx-city">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>

      <div class="wx-icon-row">
        <img :src="iconUrl" alt="Weather Icon" class="wx-icon" />
      </div>

      <p class="wx-temp">{{ celsius }} °C</p>
      <p class="wx-desc">{{ weatherData.weather[0].description }}</p>
    </main>

    <!-- Initial prompt -->
    <p v-else class="wx-hint">Allow location or search by city to see weather.</p>
  </section>
</template>

<script>
import axios from "axios";

// Read the Key from.env
const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  computed: {
    
    celsius() {
      return this.weatherData ? Number(this.weatherData.main.temp).toFixed(2) : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const url =
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}` +
          `&appid=${apikey}&units=metric`; 
        await this.fetchWeatherData(url);
      });
    },
    async searchByCity() {
      if (!this.city) return;
      const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.city)}` +
        `&appid=${apikey}&units=metric`;
      await this.fetchWeatherData(url);
    },
    async fetchWeatherData(url) {
      try {
        const { data } = await axios.get(url);
        this.weatherData = data;
      } catch (error) {
        console.error("Fetch failed:", {
          status: error.response?.status,
          data: error.response?.data,
          url,
        });
        alert("Failed to fetch weather. Check API key or quota.");
      }
    },
  },
};
</script>

<style scoped>
.wx-wrap {
  max-width: 900px;
  margin: 3rem auto 4rem;
  padding: 0 1rem;
  text-align: center;
}
.wx-title {
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  letter-spacing: .08em;
  margin: 0 0 1.25rem;
}
.wx-search {
  display: inline-flex;
  gap: .5rem;
  margin-bottom: 1.5rem;
}
.wx-input {
  width: min(520px, 70vw);
  padding: .6rem .9rem;
  border: 1px solid #cbd5e1;
  border-radius: .4rem;
  font-size: 1.1rem;
}
.wx-btn {
  padding: .6rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: .4rem;
  background: #f8fafc;
  cursor: pointer;
}
.wx-btn:hover { background: #eef2ff; }
.wx-main { margin-top: 1rem; }
.wx-city {
  font-size: clamp(1.6rem, 3.5vw, 2.8rem);
  margin: .25rem 0 1rem;
}
.wx-icon-row { margin: .5rem 0 1rem; }
.wx-icon { width: 64px; height: 64px; }
.wx-temp {
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  margin: 0 0 .25rem;
}
.wx-desc {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  text-transform: capitalize;
  color: #475569;
}
.wx-hint { color: #6b7280; }
</style>
