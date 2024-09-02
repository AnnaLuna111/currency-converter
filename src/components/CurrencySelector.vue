<template>
  <div>
    <select v-model="selectedCurrency" @change="updateCurrency">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main';
import { ref } from 'vue';

const store = useMainStore();
const options = ['RUB', 'USD', 'EUR'];
const selectedCurrency = ref(store.getBaseCurrency)
const updateCurrency = () => {
  store.setBaseCurrency(selectedCurrency.value)
}
</script>