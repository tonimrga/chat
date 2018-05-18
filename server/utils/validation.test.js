const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {

    var string = 6;
    var validation = isRealString(string);

    expect(validation).toBe(false);

  });


  it('should reject string with only spaces', () => {

    var string = '              ';
    var validation = isRealString(string);

    expect(validation).toBe(false);

  });

  it('should allow strings with non-space carachters', () => {

    var string = '   Andres    ';
    var validation = isRealString(string);

    expect(validation).toBe(true);

  });
});
