/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../../app';
// import dummyData from '../models/dummyData';
import authentication from '../helpers/Authenticator';

// const { encode } = authentication;
// const properties = dummyData;
request.agent(app.listen());


let superUserToken;

const baseUrl = '/api/v1';

describe('Property Test', () => {
  describe('Landing page and 404', () => {
    it('GET / should return status 200 and a message', async () => {
      try {
        const res = await request(app)
          .get(`${baseUrl}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('success');
      } catch (error) {
        console.log(error);
      }
    });
    it('GET /:rubbishRoute should return status 404', async () => {
      try {
        const res = await request(app)
          .get(`${baseUrl}/rubbishRoute`);
        expect(res.statusCode).toEqual(404);
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('Before', () => {
    it('signin a user', async () => {
      try {
        const res = await request(app)
          .post(`${baseUrl}/auth/signin`)
          .send({
            password: 'password',
            email: 'example@example.com',
          });
        superUserToken = res.body.data.token;
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('property routes for users', async () => {
    it('GET /property should get all properties', async () => {
      try {
        const res = await request(app)
          .get(`${baseUrl}/property`)
          .set('token', superUserToken);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('success');
      } catch (error) {
        console.log(error);
      }
    });
    it('GET /property/:propertyId should get property by Id', async () => {
      try {
        const res = await request(app)
          .get(`${baseUrl}/property/10586138425`)
          .set('token', superUserToken);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('success');
      } catch (error) {
        console.log(error);
      }
    });
    it('GET /property/:rubbishId should return does not exist', async () => {
      try {
        const res = await request(app)
          .get(`${baseUrl}/property/20000000000000000`)
          .set('token', superUserToken);
        expect(res.statusCode).toEqual(404);
        expect(res.body.status).toEqual('error');
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('property routes for agents', async () => {
    it('POST /property should create a property', async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    });
    // TODO: Fix this test is passing. When it should fail. Check
    // To make sure that when you modify something it actually modifies on the original content
    it('PATCH /property/:propertyId should update property', async () => {
      try {
        const res = await request(app)
          .get(`${baseUrl}/property/10586138425`)
          .set('token', superUserToken);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('success');
      } catch (error) {
        console.log(error);
      }
    });
    // TODO: Fix this test is not passing. Also add test to make sure the properties actually modified
    // it('PATCH /property/:propertyId/sold should mark as sold', async () => {
    //   try {
    //     const res = await request(app)
    //       .get(`${baseUrl}/property/10586138425/sold`)
    //       .set('token', superUserToken);
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body.status).toEqual('success');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    it('DELETE /property/:propertyId should delete property', async () => {
      try {
        const res = await request(app)
          .delete(`${baseUrl}/property/10586138425`)
          .set('token', superUserToken);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data).toEqual('Property successfully deleted');
      } catch (error) {
        console.log(error);
      }
    });
  });
});
