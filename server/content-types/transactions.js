// server/content-types/transactions.js
module.exports = {
  schema: {
    kind: 'collectionType',
    collectionName: 'transactions',
    info: {
      singularName: 'transaction',
      pluralName: 'transactions',
      displayName: 'PayU Transactions',
      description: '',
    },
    options: {
      draftAndPublish: false,
    },
    pluginOptions: {
      'content-manager': { visible: true },
      'content-type-builder': { visible: false },
    },
    attributes: {
      uid: { type: 'string' },
      configurationMode: {
        type: 'enumeration',
        enum: ['sandbox', 'production'],
      },
      customerIp: { type: 'string' },
      description: { type: 'string' },
      currencyCode: { type: 'string' },
      totalAmount: { type: 'string' }, // 1.15 is given as "115"
      buyer: { type: 'json' }, // at least email field will be returned from PayU
      // {
      //   "email": "john.doe@example.com",
      //   "phone": "654111654",
      //   "firstName": "John",
      //   "lastName": "Doe"
      //   "language":"pl"
      // },
      products: { type: 'json' },
      // [
      //   {
      //     "name": "Wireless Mouse for Laptop",
      //     "unitPrice": "15000",
      //     "quantity": "1"
      //   }
      // ]
      status: {
        type: 'enumeration',
        enum: [
          'CREATED',
          'NEW',
          'PENDING',
          'COMPLETED',
          'CANCELED',
          'WAITING_FOR_CONFIRMATION',
        ],
        default: 'CREATED',
      },
      redirectUri: { type: 'string' },
      orderId: { type: 'string' }, // order id on PayU side
      payMethod: { type: 'json' },
      properties: { type: 'json' },
    },
  },
}
