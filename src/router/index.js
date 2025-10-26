import { createRouter, createWebHistory } from 'vue-router'

import GetBookCountView from '../views/GetBookCountView.vue'
import AddBookView from '../views/AddBookView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'

const routes = [
  { path: '/', redirect: '/count' },
  { path: '/count', name: 'BookCounter', component: GetBookCountView },
  { path: '/add', name: 'AddBook', component: AddBookView },
  { path: '/WeatherCheck', name: 'GetWeather', component: WeatherView },
  { path: '/count-api', name: 'CountBookAPI', component: CountBookAPI },
  { path: '/books-api', name: 'GetAllBookAPI', component: GetAllBookAPI },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
