const uuid = require('uuid/v4');

const Uuid = {
  CreateId: data => `${uuid()}-${data}`,
};

module.exports = Uuid;
