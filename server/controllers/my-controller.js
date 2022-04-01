'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('payu')
      .service('myService')
      .getWelcomeMessage();
  },
};
