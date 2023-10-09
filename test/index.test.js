import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const expect = chai.expect;
const request = supertest(app);

describe('Endpoint: /connect/email', () => {

    it('should redirect to Google OAuth for Gmail addresses', (done) => {
        request.get('/connect/email?email=test@gmail.com')
            .expect(302)
            .end((err, res) => {
                expect(res.headers.location).to.include('https://accounts.google.com/o/oauth2/v2/auth');
                done(err);
            });
    });

    it('should redirect to Microsoft OAuth for Microsoft addresses', (done) => {
        request.get('/connect/email?email=test@microsoft.com')
            .expect(302)
            .end((err, res) => {
                expect(res.headers.location).to.include('https://login.microsoftonline.com');
                done(err);
            });
    });

    it('should return an error for unsupported email providers', (done) => {
        request.get('/connect/email?email=test@yahoo.com')
            .expect(400, done);
    });

    it('should return an error if email parameter is missing', (done) => {
        request.get('/connect/email')
            .expect(400, done);
    });

});

describe('Endpoint: /emails/search', () => {
  it('should return true if the user has received an email since the given timestamp', (done) => {
      request.get('/emails/search?since=1633550400')
          .set('X-Mock-User', 'test@gmail.com')
          .expect(200)
          .end((err, res) => {
              expect(res.body).to.be.true;
              done(err);
          });
  });

  it('should return false if the user hasn\'t received any emails since the given timestamp', (done) => {
      request.get('/emails/search?since=1733550400')
          .set('Mock-User', 'test@gmail.com')
          .expect(200)
          .end((err, res) => {
              expect(res.body).to.be.false;
              done(err);
          });
  });

  it('should return an error if the user is not authenticated', (done) => {
      request.get('/emails/search?since=1633550400')
          .expect(401, done);
  });

  it('should return an error if the required parameters are missing', (done) => {
      request.get('/emails/search')
          .set('Mock-User', 'test@gmail.com')
          .expect(400, done);
  });
});
