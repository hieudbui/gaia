const expect = require('expect');
const request = require('supertest');
const createServer = require('../../app_server');


describe('/terms REST', function() {
  this.timeout(3000);

  let app;
  before(() => {
    app = createServer(3001)
  });

  after(() => {
    app.close();
  });

  describe('GET /terms/:termId/longest-preview-media-url', () => {
    it('valid term id should respond with json', () => {
      const termId = 26681;
      return request(app)
        .get(`/terms/${termId}/longest-preview-media-url`)
        .expect(200)
        .then(response => {
          expect(response.body.previewDuration).toExist();
          expect(response.body.bcHLS).toExist();
          expect(response.body.previewNid).toExist();
          expect(response.body.titleNid).toExist();
        });
    });
  });
});