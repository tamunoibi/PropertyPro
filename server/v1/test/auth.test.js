/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../../app';

request.agent(app.listen());

const baseUrl = '/api/v1/auth/';
const user = {
  first_name: 'John',
  last_name: 'Paul',
  phoneNumber: '09087653462',
  password: 'password',
  email: 'tammddfy@example.com',
  address: '20 Ibuku Street, Lagos',
  is_admin: true,
};

describe('POST /auth/signup', () => {
  it('should respond with status 201', async () => {
    try {
      const res = await request(app)
        .post(`${baseUrl}/signup`)
        .send(user)
        .expect(201);
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual('success');
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 409 and message user already exists', async () => {
    try {
      const res = await request(app)
        .post(`${baseUrl}/signup`)
        .send(user)
        .expect(409);
      expect(res.statusCode).toEqual(409);
      expect(res.body).toEqual({ status: 'error', error: 'User already exists' });
    } catch (error) {
      console.log(error);
    }
  });
});
describe('POST /auth/signin', () => {
  it('should respond with 200', async () => {
    try {
      const res = await request(app)
        .post(`${baseUrl}/signin`)
        .send({ email: 'example@example.com', password: 'password' })
        .expect(200);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 401 and error Invalid username or password', async () => {
    try {
      const res = await request(app)
        .post(`${baseUrl}/signin`)
        .send({
          email: 'example@yahoo.com',
          password: 'nonExistentPassword',
        })
        .expect(401);
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual('Invalid username or password');
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 401 and error Invalid username or password', async () => {
    try {
      const res = await request(app)
        .post(`${baseUrl}/signin`)
        .send({
          email: 'nonExistentEmail@yahoo.com',
          password: 'nonExistentPassword',
        })
        .expect(401);
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual('Invalid username or password');
    } catch (error) {
      console.log(error);
    }
  });
});
