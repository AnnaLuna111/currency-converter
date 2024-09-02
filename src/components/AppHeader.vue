<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="90" height="90" />
    <nav>
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/convert">Конвертация</RouterLink>
    </nav>
    <CurrenceSelector />
  </header>
</template>

<script setup>
import CurrenceSelector from './CurrencySelector.vue';
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

nav {
  display: flex;
  gap: 20px;
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
