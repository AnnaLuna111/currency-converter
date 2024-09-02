<template>
  <div class="main">
    <h1>Конвертер валют из {{ from }} в {{ to }}</h1>
    <form @submit.prevent>
      <div class="form-group">
        <select v-model="from">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input
          type="number"
          v-model.number="amountFrom"
          @input="convert('fromTo')"
          placeholder="Введите сумму"
          step="0.01"
        />
      </div>

      <div class="form-group">
        <select v-model="to">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input
          type="number"
          v-model.number="amountTo"
          @input="convert('toFrom')"
          placeholder="Введите сумму"
          step="0.01"
        />
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>

    <div class="rate-info">
      <p>Текущий курс: {{ exchangeRate }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useMainStore } from '../stores/main';

const store = useMainStore();
const currencies = ['USD', 'EUR', 'RUB'];
const from = ref('RUB');
const to = ref('USD');
const amountFrom = ref('');
const amountTo = ref('');
const exchangeRate = ref(0);

const errorMessage = ref('');

const rates = computed(() => store.getRates);

const updateExchangeRate = () => {
  const rateKey = `${from.value.toLowerCase()}-${to.value.toLowerCase()}`;
  exchangeRate.value = rates.value[rateKey] || 1; 
};

const convert = (direction) => {
  errorMessage.value = '';
  
  if (direction === 'fromTo') {
    if (amountFrom.value <= 0) {
      errorMessage.value = 'Введите корректную сумму больше 0';
      amountTo.value = '';
    } else {
      amountTo.value = (amountFrom.value * exchangeRate.value).toFixed(2);
    }
  } else if (direction === 'toFrom') {
    if (amountTo.value <= 0) {
      errorMessage.value = 'Введите корректную сумму больше 0';
      amountFrom.value = '';
    } else {
      amountFrom.value = (amountTo.value / exchangeRate.value).toFixed(2);
    }
  }
};

onMounted(() => {
  store.fetchRates().then(() => {
    updateExchangeRate(); 
  });
});
watch([from, to], updateExchangeRate);
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-group {
  display: flex;
  gap: 15px;
}

.rate-info {
  margin-top: 20px;
  font-weight: bold;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
