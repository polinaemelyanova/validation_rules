<template>
  <div class="center-screen" style="flex-direction: column; text-align: center;">
    <h2>Пример запроса к API</h2>
    <button @click="fetchData" :disabled="loading" class="button">
      {{ loading ? 'Загрузка...' : 'Получить данные' }}
    </button>

    <div v-if="error" class="error">Ошибка: {{ error }}</div>
    <pre v-if="data" class="data-output">{{ data }}</pre>
  </div>
</template>


<script setup lang="ts">
import { useApi } from '../composables/useApi'

const { data, error, loading, success, request } = useApi()

async function fetchData() {
  await request({
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
  })
}
</script>

