// server/routes/index.js
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'paymentLink.index',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/transactions',
    handler: 'paymentLink.createTransaction',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/notify',
    handler: 'paymentLink.handleWebhook',
    config: {
      auth: false,
      policies: [],
    },
  },
]
