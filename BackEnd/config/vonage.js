const { Vonage } = require('@vonage/server-sdk');
require('dotenv').config();

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
})

module.exports = vonage;

