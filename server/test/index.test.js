/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../app';
import authentication from '../helpers/authenticate';

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
    it('should create a user', async () => {
      try {
        const res = await request(app)
          .post(`${baseUrl}/signup`)
          .send(superUser);
        res.body.data[0].isAdmin = true;
        superUserToken = encode(
          res.body.data[0].user.id,
          res.body.data[0].isAdmin,
        );
      } catch (error) {
        console.log(error);
      }
    });
    it('should respond with status 201 and the property created', async () => {
      try {
        const res = await request(app)
          .post(baseUrl)
          .set('Accept', 'application/json')
          .send({
            token: superUserToken,
            price: 2000.0,
            state: 'StateOfResidence',
            city: 'CityOfResidence',
            address: 'addressOfResidence',
            type: '3 Bedroom',
            image_url: 'https://cloudinary.com/',
          })
          .expect(201);
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('success');
        expect(res.body.data).toBe();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
