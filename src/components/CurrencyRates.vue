<template>
  <ul>
    <li v-for="(rate, currency) in currencyRates" :key="currency">
      1 {{ currency }} = {{ rate }} {{ baseCurrency }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  currencyRates: {
    type: Object,
    required: true,
  },
  baseCurrency: {
    type: String,
    required: true,
  },
});
</script>

<style>
ul {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
