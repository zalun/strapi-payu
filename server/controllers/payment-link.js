// server/controllers/payment-link,js

module.exports = {
  async index(ctx) {
    ctx.body = await strapi
      .plugin('payu')
      .service('auth')
      .getToken()
  },
  async createTransaction(ctx) {
    const data = ctx.request.body
    // TODO Validate data
    ctx.body = await strapi
      .plugin('payu')
      .service('paymentLink')
      .createTransaction(data)
  },

  async handleWebhook(ctx) {
    const data = ctx.request.body
    // TODO Validate data
    ctx.body = await strapi
      .plugin('payu')
      .service('paymentLink')
      .handleWebhook(data)
  },
}
