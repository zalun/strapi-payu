// server/utils/payu.js

const axios = require('axios')

const cachedToken = {
}

module.exports = {
  async getToken(settings) {
    const { payuAuthorizeUrl, clientId, clientSecret } = settings

    if (!cachedToken[clientId]) {
      cachedToken[clientId] = {}
    }

    if (cachedToken[clientId].token
      && cachedToken[clientId].expires_in > Date.now()) {
      return cachedToken[clientId].token
    }

    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    params.append('client_id', clientId)
    params.append('client_secret', clientSecret)

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    const req = await axios.post(payuAuthorizeUrl, params, { headers })

    cachedToken[clientId].token = req.data.access_token
    cachedToken[clientId].expires_in = Date.now() + req.data.expires_in * 1000

    return cachedToken[clientId].token
  },

  /**
   *
   * @param {object} settings
   * @param {str} token
   * @param {object} transaction
   * @param {str} customerIp
   */
  async createOrder(settings, token, transaction) {
    const { payuApiUrl, merchantPosId, notifyUrl } = settings
    const validityTime = 24 * 60 * 60
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const options = { headers, maxRedirects: 0 }
    const {
      uid: extOrderId,
      customerIp,
      currencyCode,
      totalAmount,
      description,
      buyer,
      products,
    } = transaction

    const body = {
      customerIp,
      merchantPosId,
      extOrderId,
      totalAmount,
      description,
      currencyCode,
      validityTime,
    }
    if (notifyUrl) {
      body.notifyUrl = notifyUrl
    }
    if (buyer) {
      body.buyer = buyer
    }
    if (products) {
      body.products = products
    }
    const url = `${payuApiUrl}/orders`
    // The post wants to redirect the user to the payment page
    // since we've set the `maxRedirects` to 0, an error will be thrown
    try {
      return await axios.post(url, body, options)
    } catch (error) {
      if (
        error.response.data.status
        && error.response.data.status.statusCode === 'SUCCESS'
      ) {
        return error.response.data
      }
      console.error('Failed to get payment link.')
      console.error(error.response)
      return error.response.data.status
    }
  },
}
