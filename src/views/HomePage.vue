<template>
  <main class="main">
    <h1>Курс валют</h1>
    <CurrencyRates :currency-rates="currencyRates" :base-currency="baseCurrency" />
  </main>
</template>

<script setup>
import CurrencyRates from '@/components/CurrencyRates.vue';
import { useMainStore } from '@/stores/main';
import { onMounted, computed } from 'vue';

const store = useMainStore();

const currencies = ['USD', 'EUR', 'RUB'];
const baseCurrency = computed(() => store.getBaseCurrency);

const currencyRates = computed(() => {
  const rates = store.getRates;
  const base = baseCurrency.value;

  return currencies.reduce((acc, currency) => {
    if (currency !== base) {
      const rateKey = `${currency.toLowerCase()}-${base.toLowerCase()}`;

      if (rates[rateKey]) {
        acc[currency] = rates[rateKey];
      } else {
        acc[currency] = 'Курс не найден';
      }
    }
    
    return acc;
  }, {});
});

onMounted(() => {
  store.fetchRates();
});
</script>
