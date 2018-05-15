var moment = require('moment');
var generateMessage = (from, text) => {

  return {
    from,
    text,
    created: moment().valueOf()
  };
};

var generateLocationMessage = (from, lat, long) => {

  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    created: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
