const request = require('supertest');
// import request from 'supertest';
// import app from '../index';
const app = require('../index').default;

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        phone: '1234567890'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('user');
  });

describe('POST /api/auth/register', () => {
  it('should return 422 status and error messages for missing required fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        // Missing required fields
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(3); // Assuming firstName, lastName, and email are required
    expect(res.body.errors[0]).toHaveProperty('field', 'firstName');
    expect(res.body.errors[1]).toHaveProperty('field', 'lastName');
    expect(res.body.errors[2]).toHaveProperty('field', 'email');
  });

  it('should return 422 status and error message for invalid email format', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid_email',
        password: 'password',
        phone: '1234567890'
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toHaveProperty('field', 'email');
  });

});

describe('POST /api/auth/register', () => {
  it('should return 422 status and error message for duplicate email', async () => {
    // Register a user with a specific email first
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        phone: '1234567890'
      });

    // Attempt to register another user with the same email
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'john.doe@example.com', // Duplicate email
        password: 'password',
        phone: '9876543210'
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toHaveProperty('field', 'email');
    expect(res.body.errors[0]).toHaveProperty('message', 'Email already exists');
  });
});

describe('POST /api/auth/login', () => {
  it('should return 200 status and access token on successful login', async () => {
    // Assuming you have registered a user first
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        phone: '1234567890'
      });

    // Login with valid credentials
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('user');
  });

  it('should return 401 status on login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'invalid_email@example.com',
        password: 'invalid_password'
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('status', 'Bad request');
    expect(res.body).toHaveProperty('message', 'Authentication failed');
  });
});

});

