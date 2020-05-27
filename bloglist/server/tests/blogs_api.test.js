const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app.js');
const api = supertest(app);
const Blog = require('../models/Blog');
const User = require('../models/User');
const initialBlogs = require('./data_for_testing').blogs;
const singleBlog = require('./data_for_testing').blog;

const { blogsInDb, nonExistingId } = require('./test_helper');

// TO RUN TEST ONLY HERE -> "$ npm test -- tests/blogs_api.test.js"

// Before running the tests reset the test-blog-list/blogs in the DB
beforeEach(async () => {
  await Blog.deleteMany({});

  // Initialize the new blog objects in an array
  const blogsObject = initialBlogs.map(blog => new Blog(blog));
  // Save the blog objects to the DB, this will create an array of promises
  const promiseArray = blogsObject.map(blog => blog.save());

  // Wait with the execution until all the promises ae resolved
  await Promise.all(promiseArray);
});

// BLOG TESTS =======================================
describe('When there is initially some blogs saved', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('All blogs are returned', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(initialBlogs.length);
  });

  test('The returned blogs _id key is formatted correctly (id)', async () => {
    const res = await api.get('/api/blogs');

    res.body.forEach(blog => {
      expect(blog.id).toBeDefined();
    });
  });

  test('A specific blog can be viewed', async () => {
    const blogs = await blogsInDb();

    const blog = blogs[0];

    const res = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(res.body).toEqual(blog);
  });

  test('fails with statuscode 404 if note does not exist', async () => {
    const nonExistId = await nonExistingId();

    // console.log(nonExistId);

    await api.get(`/api/blogs/${nonExistId}`).expect(404);
  });

  test('fails with statuscode 400 if id is formatted incorrectly', async () => {
    const incorrectId = 'gs2z4u2zdh82zd8384z4c';

    await api.get(`/api/blogs/${incorrectId}`).expect(400);
  });
});

// ---------------------------------------------------------------

describe('Addition/update/remove of a blog', () => {
  test('After posting a new blog the blogs array in the DB increases by one and the the new content is correct', async () => {
    await api
      .post('/api/blogs')
      .send(singleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await blogsInDb();

    expect(blogs).toHaveLength(initialBlogs.length + 1);

    expect(blogs[blogs.length - 1]).toMatchObject(singleBlog);
  });

  test('If the title is missing the server respons with 400', async () => {
    const blogCopy = { ...singleBlog };
    delete blogCopy.title;

    await api
      .post('/api/blogs')
      .send(blogCopy)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('If the likes property is missing, it will default to the value 0', async () => {
    const blogCopy = { ...singleBlog };
    delete blogCopy.likes;

    await api
      .post('/api/blogs')
      .send(blogCopy)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await blogsInDb();

    expect(res[res.length - 1].likes).toBe(0);
  });

  test('When a blog is deleted the server responds correctly', async () => {
    const blogs = await blogsInDb();

    const blogToDelete = blogs[1];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(200);

    const blogsAfterDelete = await blogsInDb();

    expect(blogsAfterDelete.length).toBe(blogs.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
