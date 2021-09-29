const request = require('supertest');
const server = 'http://localhost:3000';

// testing POST /signup endpoint

describe('Route integration', () => {

  describe('/signup', () => {
    describe('POST', () => {
      it('responds with json containing user document and status of 200', (done) => {
        request(server)
          .post('/signup')
          .send({ email: 'super@gmail.com', password: 'super' })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });

  });


  describe('/signin', () => {
    describe('POST', () => {
      it('if user exists, responds with json containing user document and status of 200', (done) => {
        request(server)
          .post('/signin')
          .send({ email: 'admin', password: 'asmin' })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });

  });


  describe('/apps', () => {
    describe('POST', () => {
      it('if user exists, it responds with json containing user document and status of 200', (done) => {
        request(server)
          .post('/apps')
          .send({ email: 'admin', password: 'asmin' })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });

    // describe('GET', () => {
    //   it('responds with 200 status and json')
    //     request(server)
    //       .get('/apps')
    //       .expect('')
    // })

  });

});