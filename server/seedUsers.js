const users = require('./mockdata/users');

console.log('Users loaded:', users.length);

users.forEach((user) => {
  console.log({
    _id: user._id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt
  });
});