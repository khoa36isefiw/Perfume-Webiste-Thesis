const axios = require('axios');

const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_KEY;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET_KEY;

// Function to get PayPal access token
const getPayPalToken = async () => {
    const response = await axios({
        url: `${PAYPAL_API}/v1/oauth2/token`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_CLIENT_SECRET,
        },
        data: 'grant_type=client_credentials',
    });

    return response.data.access_token;
};

module.exports = { getPayPalToken, PAYPAL_API };
