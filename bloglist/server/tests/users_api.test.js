const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const api = supertest(app);
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { usersInDb } = require('./test_helper');

// TO RUN TEST ONLY HERE -> "$ npm test -- tests/users_api.test.js"

// Before running the tests reset the test-blog-list/users in the DB
beforeEach(async () => {
  const initialUser = {
    name: 'Initial User',
    username: 'root',
    password: 'secret',
  };

  const { name, username, password } = initialUser;

  await User.deleteMany();

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  await user.save();
});

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      name: 'Zoltan Szokodi',
      username: 'Zszokodi',
      password: '12345678',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.name);
    expect(usernames).toContain(newUser.name);
  });

  test('creation fails with statuscode 400 and message if username already taken', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      name: 'Zoltan Szokodi',
      username: 'root',
      password: '12345678',
    };

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.error).toContain('This username is already taken.');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
