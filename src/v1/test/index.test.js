/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';

import app from '../../app';

request.agent(app.listen());


let superUserToken;
let validPropertyId;
let validPropertyIdDelete;

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
  describe('POST /auth/signup', () => {
    it('Before: signup should respond with status 201', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({
          first_name: 'testFirstName',
          last_name: 'testLastName',
          phone_number: '09087653862',
          password: 'password',
          email: 'testEmail@example.com',
          address: '20 Ibuku Street, Lagos',
        })
        .expect(201);
      expect(res.statusCode).toEqual(201);
      expect(res.status);
      expect(res.body.status).toEqual('success');
    });
    it('should respond with 400 required fields missing', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({
          first_name: 'nameWithNOthingElse',
        })
        .expect(400);
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('error');
    });
    it('should respond with 409 and message user already exists', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({
          first_name: 'John',
          last_name: 'Paul',
          phone_number: '09087653462',
          password: 'password',
          email: 'testEmail@example.com',
          address: '20 Ibuku Street, Lagos',
        })
        .expect(409);
      expect(res.statusCode).toEqual(409);
      expect(res.body.status).toEqual('error');
    });
  });
  describe('Before: Signin user', () => {
    it('signin a user', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/signin`)
        .send({ email: 'testAgentEmail@example.com', password: 'admin' })
        .expect(200);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');

      superUserToken = res.body.data.token;
    });
  });
  describe('POST /auth/signin', () => {
    it('should respond with 401 and error Invalid email or password', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/signin`)
        .send({
          email: 'example@yahoo.com',
          password: 'nonExistentPassword',
        })
        .expect(401);
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });
    it('should respond with 401 and error Invalid email or password', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/signin`)
        .send({
          email: 'nonExistentEmail@yahoo.com',
          password: 'nonExistentPassword',
        })
        .expect(401);
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });
  });
  describe('property routes for agents', async () => {
    it('Before: POST /property should return status 201 and create a property', async () => {
      const res = await request(app)
        .post(`${baseUrl}/property`)
        .set('token', superUserToken)
        .send({
          price: 2000.00,
          state: 'Lagos State',
          city: 'Yaba',
          address: '20 Ikorodu Road',
          type: '3 Bedroom',
          image_url: 'http://res.cloudinary.com/dqdbrbcqm/image/upload/t_media_lib_thumb/v1563016246/PropertyProLite/ubpm9mgjfcyvodbfez03.jpg',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toEqual('success');
      validPropertyId = res.body.data.id;
    });
    // it('POST /property should return status 400 required fields missing', async () => {
    //   const res = await request(app)
    //     .post(`${baseUrl}/property`)
    //     .set('token', superUserToken)
    //     .send({
    //       state: 'Lagos State',
    //       city: 'Yaba',
    //       address: '20 Ikorodu Road',
    //       type: '3 Bedroom',
    //       image_url: 'http://res.cloudinary.com/dqdbrbcqm/image/upload/t_media_lib_thumb/v1563016246/PropertyProLite/ubpm9mgjfcyvodbfez03.jpg',
    //     });
    //   expect(res.statusCode).toEqual(400);
    //   expect(res.body.status).toEqual('error');
    // });
    it('POST /property should return 401 authorization error', async () => {
      const res = await request(app)
        .post(`${baseUrl}/property`)
        .set('token', 'rubbishToken');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });


    it('PATCH /property/:propertyId should update property', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/${validPropertyId}`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    it('PATCH /property/:propertyId should return 400 validation error', async () => {
      const res = await request(app)
        .patch(`${baseUrl}/property/NaN`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('error');
    });
    it('PATCH /property/:rubbishIdNAN should return 400 required fields missing', async () => {
      const res = await request(app)
        .patch(`${baseUrl}/property/NaN`)
        .set('token', superUserToken)
        .send({ nonExistent: 'value' });
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('error');
    });
    it('PATCH /property/:propertyId should return 401 authorization error', async () => {
      const res = await request(app)
        .patch(`${baseUrl}/property/${validPropertyId}`)
        .set('token', 'rubbishToken');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });
    it('PATCH /property/:propertyId should return 404 not found', async () => {
      const res = await request(app)
        .patch(`${baseUrl}/property/000`)
        .set('token', superUserToken)
        .send({ state: 'value' });
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toEqual('error');
    });

    it('PATCH /property/:propertyId/sold return status 200 and mark property as sold', async () => {
      const res = await request(app)
        .patch(`${baseUrl}/property/${validPropertyId}/sold`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
      expect(res.body.data.status).toEqual('sold');
    });
    it('PATCH /property/:propertyId/sold should return 400 validation error', async () => {
      const res = await request(app)
        .patch(`${baseUrl}/property/NaN/sold`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('error');
    });
    it('PATCH /property/:propertyId/sold should return 401 authorization error', async () => {
      const res = await request(app)
        .patch(`${baseUrl}/property/${validPropertyId}/sold`)
        .set('token', 'rubishToken');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });
    it('PATCH /property/:rubbishId should return 404 not found', async () => {
      const res = await request(app)
        .patch(`${baseUrl}/property/000/sold`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toEqual('error');
    });


    it('Before delete: create a property', async () => {
      const res = await request(app)
        .post(`${baseUrl}/property`)
        .set('token', superUserToken)
        .send({
          price: 2000.00,
          state: 'Lagos State',
          city: 'Yaba',
          address: '20 Ikorodu Road',
          type: '3 Bedroom',
          image_url: 'http://res.cloudinary.com/dqdbrbcqm/image/upload/t_media_lib_thumb/v1563016246/PropertyProLite/ubpm9mgjfcyvodbfez03.jpg',
        });
      validPropertyIdDelete = res.body.data.id;
    });
    it('DELETE /property/:propertyId return status 200 and delete a property', async () => {
      const res = await request(app)
        .delete(`${baseUrl}/property/${validPropertyIdDelete}`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    it('DELETE /property/:rubbishIdNAN should return 400 validation error', async () => {
      const res = await request(app)
        .delete(`${baseUrl}/property/nan`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('error');
    });
    it('DELETE /property/:propertyId should return 401 authorization error', async () => {
      const res = await request(app)
        .delete(`${baseUrl}/property/${validPropertyId}`)
        .set('token', 'rubbishToken');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });
    it('DELETE /property/:rubbishId should return 404 not found', async () => {
      const res = await request(app)
        .delete(`${baseUrl}/property/4564`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toEqual('error');
    });
  });
  describe('property routes for users', async () => {
    it('GET /property should return status 200 and get all properties', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    it('GET /property status 401 authorization error', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property`)
        .set('token', 'rubbishToken');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });


    it('GET /property/?type status 200 should get all properties of a type', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/?mini-flat`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    it('GET /property/?type status 401 authorization error', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/?typeOfProperty`)
        .set('token', 'invalidToken');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });
    it('GET /property/?type=rubbishType status 404 non found', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/?type=rubbishType`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toEqual('error');
    });


    it('GET /property/:propertyId should get property by Id', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/${validPropertyId}`)
        .set('token', superUserToken);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
    });
    it('GET /property/:propertyId should get property by Id', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/${validPropertyId}`)
        .set('token', 'rubbishToken');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });
    it('GET /property/:rubbishId should return does not exist', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/00`)
        .set('token', superUserToken);
      expect(res.statusCode).toEqual(404);
      expect(res.body.status).toEqual('error');
    });
  });
});
