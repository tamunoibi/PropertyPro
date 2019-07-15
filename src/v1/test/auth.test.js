/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../../app';

request.agent(app.listen());
const baseUrl = 'api/v1/auth';
describe('POST /auth/signup', () => {
  // it('should respond with status 201', async () => {
  //   const res = await request(app)
  //     .post(`${baseUrl}/signup`)
  //     .send({
  //       first_name: 'John',
  //       last_name: 'Paul',
  //       phone_number: '09087653862',
  //       password: 'password',
  //       email: 'tammyNew@example.com',
  //       address: '20 Ibuku Street, Lagos',
  //       is_admin: true,
  //     })
  //     .expect(201);
  //   expect(res.statusCode).toEqual(201);
  //   console.log(res.body);

  //   expect(res.status);
  //   expect(res.body.status).toEqual('success');
  // });
  // it('should respond with 400 required fields missing', async () => {
  //   const res = await request(app)
  //     .post(`${baseUrl}/signup`)
  //     .send({
  //       first_name: 'John',
  //     })
  //     .expect(400);
  //   expect(res.statusCode).toEqual(400);
  //   expect(res.body.status).toEqual('error');
  // });
  // it('should respond with 409 and message user already exists', async () => {
  //   const res = await request(app)
  //     .post(`${baseUrl}/signup`)
  //     .send({
  //       first_name: 'John',
  //       last_name: 'Paul',
  //       phone_number: '09087653462',
  //       password: 'password',
  //       email: 'tammddfy@example.com',
  //       address: '20 Ibuku Street, Lagos',
  //       is_admin: true,
  //     })
  //     .expect(409);
  //   expect(res.statusCode).toEqual(409);
  //   expect(res.body.status).toEqual('error');
  // });
});
// describe('POST /auth/signin', () => {
//   it('should respond with 200', async () => {
//     const res = await request(app)
//       .post(`${baseUrl}/signin`)
//       .send({ email: 'example@example.com', password: 'password' })
//       .expect(200);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.status).toEqual('success');
//   });
//   // it('should respond with 401 and error Invalid email or password', async () => {
//   //   const res = await request(app)
//   //     .post(`${baseUrl}/signin`)
//   //     .send({
//   //       email: 'example@yahoo.com',
//   //       password: 'nonExistentPassword',
//   //     })
//   //     .expect(401);
//   //   expect(res.statusCode).toEqual(401);
//   //   expect(res.body.status).toEqual('error');
//   // });
//   // it('should respond with 401 and error Invalid email or password', async () => {
//   //   const res = await request(app)
//   //     .post(`${baseUrl}/signin`)
//   //     .send({
//   //       email: 'nonExistentEmail@yahoo.com',
//   //       password: 'nonExistentPassword',
//   //     })
//   //     .expect(401);
//   //   expect(res.statusCode).toEqual(401);
//   //   expect(res.body.status).toEqual('error');
//   // });
//   // it('should respond with 401 unauthorized', async () => {
//   //   const res = await request(app)
//   //     .post(`${baseUrl}/signin`)
//   //     .send({ email: 'nonExistentEmail@yahoo.com', password: 'nonExistentPassword' })
//   //     .expect(401);
//   //   expect(res.statusCode).toEqual(401);
//   //   expect(res.body.status).toEqual('error');
//   // });
// });
