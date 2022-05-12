// server/services/payment-link.js

const { v4: uuid } = require('uuid')

const { createOrder } = require('../utils/payu')

module.exports = ({ strapi }) => ({

  /**
   *
   * @param {object} data data has to contain the following properties:
   * @param {string} data.
   */
  async createTransaction(data) {
    const { configuration, settings } = await strapi
      .plugin('payu')
      .service('settings')
      .getSettings()

    const { token } = await strapi
      .plugin('payu')
      .service('auth')
      .getToken(settings)

    const transactionCollection = await strapi.query('plugin::payu.transaction')
    // create order with CREATED status
    const transactionData = data
    transactionData.uid = uuid()
    transactionData.configurationMode = configuration.mode
    let transaction = await transactionCollection.create({
      data: transactionData,
    })
    // collect payment link
    const paymentLink = await createOrder(settings, token, transaction)
    if (!paymentLink) {
      throw Error('PayU payment link creation failed')
    }
    // update order with payment link
    const { redirectUri, orderId } = paymentLink
    transaction = await transactionCollection.update({
      where: { id: transaction.id },
      data: { redirectUri, orderId, status: 'NEW' },
    })

    return { transaction }
  },

  async handleWebhook(data) {
    // const { configuration, settings } = await strapi
    //   .plugin('payu')
    //   .service('settings')
    //   .getSettings()

    // const { token } = await strapi
    //   .plugin('payu')
    //   .service('auth')
    //   .getToken(settings)

    const transactionCollection = await strapi.query('plugin::payu.transaction')
    const transaction = await transactionCollection.findOne({
      where: { uid: data.order.extOrderId },
    })
    if (!transaction) {
      throw Error('PayU transaction not found')
    }
    const { status } = data.order
    const { buyer } = data.order
    const { properties } = data
    const { payMethod } = data.order
    const updateData = { status }
    if (buyer) {
      updateData.buyer = buyer
    }
    if (properties) {
      updateData.properties = properties
    }
    if (payMethod) {
      updateData.payMethod = payMethod
    }
    return {
      transaction: await transactionCollection.update({
        where: { id: transaction.id },
        data: updateData,
      }),
    }
  },
})
