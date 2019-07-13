// TODO: Query how do I simulate 500 internal server error

/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
// import debug from 'debug';
import app from '../../app';
// import dummyData from '../models/dummyData';
// const properties = dummyData;
// const logger = debug('dev:test');

request.agent(app.listen());


let superUserToken;

const baseUrl = '/api/v1';

describe('Property Test', () => {
  describe('Landing page and 404', () => {
    it('GET / should return status 200 and a message', async () => {
      const res = await request(app)
        .get(`${baseUrl}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    it('GET /:rubbishRoute should return status 404', async () => {
      const res = await request(app)
        .get(`${baseUrl}/rubbishRoute`);
      expect(res.statusCode).toEqual(404);
    });
  });
  describe('Before', () => {
    it('signin a user', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/signin`)
        .send({
          password: 'password',
          email: 'example@example.com',
        });
      superUserToken = res.body.data.token;
    });
  });
  describe('property routes for users', async () => {
    it('GET /property should get all properties', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    it('GET /property/:propertyId should get property by Id', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/10586138425`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    it('GET /property/:rubbishId should return does not exist', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/20000000000000000`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toEqual('error');
    });
  });
  describe('property routes for agents', async () => {
    it('POST /property should create a property', async () => {
      const res = await request(app)
        .post(`${baseUrl}/property`)
        .set('token', superUserToken)
        .send({
          price: 2000.00,
          state: 'Lagos State',
          city: 'Yaba',
          address: '20 Ikorodu Road',
          type: '3 Bedroom',
          image_url: 'https://cloudinary.com/',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual('success');
    });
    // TODO: Add fix this test cases
    // it('POST /property/:propertyId should return 400 required fields missing', async () => {
    //   const res = await request(app)
    //     .post(`${baseUrl}/property/10586138425`)
    //     .set('token', superUserToken);
    //   expect(res.statusCode).toEqual(400);
    //   expect(res.body.status).toEqual('error');
    // });
    // it('POST /property/:propertyId should return 401', async () => {
    //   const res = await request(app)
    //     .post(`${baseUrl}/property/10586138425`)
    //     .set('token', superUserToken);
    //   expect(res.statusCode).toEqual(401);
    //   expect(res.body.status).toEqual('error');
    // });
    // it('POST /property/:propertyId should return 404', async () => {
    //   const res = await request(app)
    //     .post(`${baseUrl}/property/10586138425`)
    //     .set('token', superUserToken);
    //   expect(res.statusCode).toEqual(404);
    //   expect(res.body.status).toEqual('error');
    // });


    it('PATCH /property/:propertyId should update property', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/10586138425`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    // TODO: Add fix this test cases
    // it('PATCH /property/:propertyId should return 401', async () => {
    //   const res = await request(app)
    //     .patch(`${baseUrl}/property/10586138425`)
    //     .set('token', superUserToken);
    //   expect(res.statusCode).toEqual(401);
    //   expect(res.body.status).toEqual('error');
    // });
    // it('PATCH /property/:propertyId should return 404', async () => {
    //   const res = await request(app)
    //     .patch(`${baseUrl}/property/10586138425`)
    //     .set('token', superUserToken);
    //   expect(res.statusCode).toEqual(404);
    //   expect(res.body.status).toEqual('error');
    // });


    it('PATCH /property/:propertyId/sold should mark as sold', async () => {
      const res = await request(app)
        .patch(`${baseUrl}/property/10586138425/sold`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
      expect(res.body.data.status).toEqual('sold');
    });
    // TODO: Add fix this test cases
    // it('PATCH /property/:propertyId/sold should return 401', async () => {
    //   const res = await request(app)
    //     .patch(`${baseUrl}/property/10586138425/sold`)
    //     .set('token', superUserToken);
    //   expect(res.statusCode).toEqual(401);
    //   expect(res.body.status).toEqual('error');
    // });
    // it('PATCH /property/:propertyId should return 404', async () => {
    //   const res = await request(app)
    //     .patch(`${baseUrl}/property/10586138425/sold`)
    //     .set('token', superUserToken);
    //   expect(res.statusCode).toEqual(404);
    //   expect(res.body.status).toEqual('error');
    // });


    it('DELETE /property/:propertyId should delete property', async () => {
      const res = await request(app)
        .delete(`${baseUrl}/property/10586138425`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    it('DELETE /property/:propertyId should return 401', async () => {
      const res = await request(app)
        .delete(`${baseUrl}/property/00000`)
        .set('token', '000');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });
    // TODO: start adding tests from here
    // it('DELETE /property/:rubbishId should return 404', async () => {
    //   const res = await request(app)
    //     .delete(`${baseUrl}/property`)
    //     .set('token', superUserToken);
    //   expect(res.statusCode).toEqual(404);
    //   expect(res.body.status).toEqual('error');
    // });
    // TODO: test for queryParams that are not numbers: find out if u should check
    // it('DELETE /property/:rubbishId should return 404', async () => {
    //   const res = await request(app)
    //     .delete(`${baseUrl}/property`)
    //     .set('token', superUserToken);
    //   expect(res.statusCode).toEqual(404);
    //   expect(res.body.status).toEqual('error');
    // });
  });
});
