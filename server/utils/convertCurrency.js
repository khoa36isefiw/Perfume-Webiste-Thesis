const axios = require('axios');

async function getConversionRate() {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/VND`);
    const usdRate = response.data.rates.USD;
    return usdRate;
}

module.exports = { getConversionRate };
