/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
// import debug from 'debug';
import app from '../../app';

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
        .get(`${baseUrl}/property/?mini-flat`)
        .set('token', 'invalidToken');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
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
    it('POST /property should return status 201 and create a property', async () => {
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
    it('POST /property should return status 400 required fields missing', async () => {
      const res = await request(app)
        .post(`${baseUrl}/property`)
        .set('token', superUserToken)
        .send({
          state: 'Lagos State',
          city: 'Yaba',
          address: '20 Ikorodu Road',
          type: '3 Bedroom',
          image_url: 'https://cloudinary.com/',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('error');
    });
    it('POST /property should return 401 authorization error', async () => {
      const res = await request(app)
        .post(`${baseUrl}/property`)
        .set('token', 'rubbishToken');
      expect(res.statusCode).toEqual(401);
      expect(res.body.status).toEqual('error');
    });


    it('PATCH /property/:propertyId should update property', async () => {
      const res = await request(app)
        .get(`${baseUrl}/property/10586138425`)
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
        .patch(`${baseUrl}/property/10586138425`)
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
        .patch(`${baseUrl}/property/10586138425/sold`)
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
        .patch(`${baseUrl}/property/10586138425/sold`)
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


    it('DELETE /property/:propertyId return status 200 and delete a property', async () => {
      const res = await request(app)
        .delete(`${baseUrl}/property/10586138425`)
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
        .delete(`${baseUrl}/property/10586138425`)
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
});
