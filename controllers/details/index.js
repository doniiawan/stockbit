const express = require('express')
const router = express.Router()

const api = require('../../libs/axios')
const logger = require('../../models/logger')

router.route('/').get(index)

async function index(req, res) {
  try {
    let queryString = '?apikey=' + process.env.API_KEY

    const i = req.query.id

    if (!i) {
      return res.status(400).json({ message: 'Movie id required' })
    }

    queryString += '&' + 'i' + '=' + i

    let apiResponse = await api
      .get(queryString)
      .then((res) => {
        logger.storeLogger({
          method: req.method,
          path: req.baseUrl,
          parameters: req.query,
          status: 200,
        })
        return res
      })
      .catch((err) => {
        logger.storeLogger({
          method: req.method,
          path: req.baseUrl,
          parameters: req.query,
          status: err.response.status,
        })
        return res
          .status(err.response.status)
          .json({ message: 'Error', data: err.response.data })
      })
    return res.status(200).json({ message: 'Ok', data: apiResponse.data })
  } catch (error) {
    logger.storeLogger({
      method: req.method,
      path: req.baseUrl,
      parameters: req.query,
      status: 500,
    })
    return res.status(500).json({ message: 'Error has occured' })
  }
}

module.exports = router
