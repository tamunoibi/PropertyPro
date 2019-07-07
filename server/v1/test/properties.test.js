/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../../app';
import authentication from '../helpers/Authenticator';

const { encode } = authentication;

request.agent(app.listen());

const superUser = {
  password: 'password',
  email: 'example@example.com',
};

let superUserToken;

const baseUrl = '/api/v1';

describe('Property Test', () => {
  describe('Before', () => {
    it('signin a user', async () => {
      try {
        const res = await request(app)
          .post(`${baseUrl}/auth/signin`)
          .send(superUser);
        superUserToken = res.body.data.token;
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('GET property', async () => {
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
        console.log('TCL: res.body;', res.body);
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
        expect(res.body.error).toEqual('The Property with the given id does not exist');
      } catch (error) {
        console.log(error);
      }
    });
    // TODO: Start Testing from here
    // it('PATCH /property should create a property', async () => {
    //   try {
    //     const res = await request(app)
    //       .get(`${baseUrl}/property`)
    //       .set('token', superUserToken);
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body.status).toEqual('success');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    // it('PATCH /property/:propertyId should update property', async () => {
    //   try {
    //     const res = await request(app)
    //       .get(`${baseUrl}/property/10586138425`)
    //       .set('token', superUserToken);
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body.status).toEqual('success');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
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
    // it('DELETE /property/:propertyId should delete property', async () => {
    //   try {
    //     const res = await request(app)
    //       .delete(`${baseUrl}/property/10586138425`)
    //       .set('token', superUserToken);
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body.status).toEqual('success');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
  });
});
