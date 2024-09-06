import { defineStore } from 'pinia';
import { fetchCurrencyRates } from '../server/api';

export const useMainStore = defineStore('main', {
  state: () => ({
    baseCurrency: 'RUB',
    rates: {}
  }),
  actions: {
    async fetchRates() {
      try {
        this.rates = await fetchCurrencyRates();
      } catch (error) {
        console.error("Ошибка при получении курсов валют:", error);
      }
    },
    
    setBaseCurrency(currency) {
      this.baseCurrency = currency;
      this.fetchRates();
    },
    
    startAutoUpdate(interval = 60000) { 
      setInterval(() => {
        this.fetchRates();
      }, interval);
    }
  },
  
  getters: {
    getBaseCurrency: (state) => state.baseCurrency,
    getRates: (state) => state.rates,
  }
});
