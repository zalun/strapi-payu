// server/content-types/index.js
'use strict';

const productionSettings = require("./production-settings");
const sandboxSettings = require("./sandbox-settings");
const configuration = require("./configuration");
const transaction = require("./transactions");


module.exports = {
  "production-settings": productionSettings,
  "sandbox-settings": sandboxSettings,
  configuration,
  transaction,
}
