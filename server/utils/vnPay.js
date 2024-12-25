require('dotenv').config();
const crypto = require('crypto');
const querystring = require('qs');
const moment = require('moment');
const sortObject = require('./order');

const returnUrl = `${process.env.BASE_URL}/payments/vnpay/return`;
const vnp_TmnCode = process.env.VNPAY_TMN_CODE;
const vnp_HashSecret = process.env.VNPAY_HASH_SERECT;
const vnp_Url = process.env.VNPAY_URL;
const vnp_Api = process.env.VNPAY_API;

const generateVnPayUrl = (ipAddr, order) => {
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let tmnCode = vnp_TmnCode;
    let secretKey = vnp_HashSecret;
    let vnpUrl = vnp_Url;

    let locale = 'vn';
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = order._id;
    vnp_Params['vnp_OrderInfo'] = order._id;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = (order.adjustedTotalPrice || order.originalTotalPrice) * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = 'VNBANK';

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    return vnpUrl;
};

module.exports = {
    generateVnPayUrl,
};
