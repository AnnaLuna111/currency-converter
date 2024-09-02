import { defineStore } from 'pinia';
import axios from 'axios';

export const useMainStore = defineStore('main', {
  state: () => ({
    baseCurrency: 'RUB',
    rates: {}
  }),
  actions: {
    async fetchRates() {
      try {
        const { data } = await axios.get('https://status.neuralgeneration.com/api/currency');
        this.rates = data;
      } catch (error) {
        console.error("Ошибка при получении курсов валют:", error);
      }
    },
    setBaseCurrency(currency) {
      this.baseCurrency = currency;
      this.fetchRates();
    }
  },
  getters: {
    getBaseCurrency: (state) => state.baseCurrency,
    getRates: (state) => state.rates,
  }
});
