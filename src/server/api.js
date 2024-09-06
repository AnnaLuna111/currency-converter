import axios from 'axios';

export const fetchCurrencyRates = async () => {
  try {
    const { data } = await axios.get('https://status.neuralgeneration.com/api/currency');
    return data;
  } catch (error) {
    console.error('Ошибка при запросе курсов валют:', error);
    throw error;
  }
};
