import request from 'supertest';
import server from 'server';
import { expect } from 'chai';

describe('routes->users->login', () => {
  describe('validation', () => {
    it('should fail if email is omitted', (done) => {
      request(server)
        .post('/users/signin')
        .expect(200)
        .end((err, res) => {
          const { status, data } = res.body;
          expect(status).to.eql('fail');
          expect(data.email).to.be.an('object');
          expect(data.password).to.be.an('object');
          done();
        });
    });
  });
});
