const axios = require('axios')

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
})

module.exports = api
