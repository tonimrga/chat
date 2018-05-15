var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {

    var from = 'Jen';
    var text = 'some message';
    var message = generateMessage(from, text);

    expect(message.created).toBeA('number');
    expect(message).toInclude({from, text});

  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {

    var from = 'Admin';
    var lat = '15';
    var long = '19';
    var url = 'https://www.google.com/maps?q=15,19';

    var message= generateLocationMessage(from, lat, long);

    expect(message.created).toBeA('number');
    expect(message).toInclude({from, url});

  });
});
