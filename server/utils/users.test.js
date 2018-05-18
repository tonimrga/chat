const expect = require('expect');
const {Users} = require('./users');

describe('Users', () =>{
var users;
beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '1',
    name: 'Mike',
    room: 'nesto'
  },
  {
    id: '2',
    name: 'promike',
    room: 'React'
  },
  {
    id: '3',
    name: 'rere',
    room: 'nesto'
  }];
});

    it('should add new user', () => {
        var users = new Users();
        var user = {
          id: '123',
          name: 'toni',
          room: 'test'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for nesto', () => {
        var userList = users.getUserList('nesto');

        expect(userList).toEqual(['Mike','rere']);
    });


it('should return names for React', () => {
    var userList = users.getUserList('React');

    expect(userList).toEqual(['promike']);
});

it('should remove a user', () => {
  var userId = '1';

  var user = users.removeUser(userId);

  expect(user.id).toBe(userId);
  expect(users.users.length).toBe(2);

});

it('should not remove a user', () => {
  var userId = '32';

  var user = users.removeUser(userId);

  expect(user).toNotExist();
  expect(users.users.length).toBe(3);
});

it('should find a user', () => {
    var userId = '2';

    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
});

it('should not find a user', () => {
  var userId = '22';

  var user = users.getUser(userId);

  expect(user).toNotExist();
});
});
