<template>
  <nav>
    <router-link class="link" to="/form">Форма</router-link> |
    <router-link class="link" to="/api">API пример</router-link>
  </nav>

  <router-view />
</template>


<style>
.link {
  text-decoration: none;
  font-size: 24px;
}
</style>