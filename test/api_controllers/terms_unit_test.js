const sinon = require('sinon');
const expect = require('expect');

const termsController = require('../../app_server/api_controllers/terms');
const mediaService = require('../../app_server/services/media');
const TestObjects = require('../../app_server/utils/test_objects');
const _ = require('lodash');

describe('TermsController', () => {

  let response;

  let mediaServiceGetFirstCategoryStub;
  let mediaServiceGetLongestPreviewTitleStub;
  let mediaServiceGetPreviewTitleMediaStub;

  beforeEach(() => {
    response = _.cloneDeep(TestObjects.mockResponse);
    mediaServiceGetFirstCategoryStub = sinon.stub(mediaService, 'getFirstCategory');
    mediaServiceGetLongestPreviewTitleStub = sinon.stub(mediaService, 'getLongestPreviewTitle');
    mediaServiceGetPreviewTitleMediaStub = sinon.stub(mediaService, 'getPreviewTitleMedia');
  });

  afterEach(() => {
    mediaServiceGetFirstCategoryStub.restore();
    mediaServiceGetLongestPreviewTitleStub.restore();
    mediaServiceGetPreviewTitleMediaStub.restore();
  });

  describe('#longestPreview', () => {
    it('term not found should return a 404', () => {
      mediaServiceGetFirstCategoryStub.returns(Promise.resolve(null));

      const termId = 'termId';
      const req = {
        params: {termId: termId}
      }
      return termsController.longestPreview(req, response).then(() => {
        expect(response.status).toBe(404);
        expect(response.message).toBe(`term ${termId} not found`);
      })
    });

    it('thrown error will return a 500', () => {
      mediaServiceGetFirstCategoryStub.returns(Promise.resolve({}));
      mediaServiceGetLongestPreviewTitleStub.returns(Promise.reject('blah'));

      const termId = 'termId';
      const req = {
        params: {termId: termId}
      }
      return termsController.longestPreview(req, response).then(() => {
        expect(response.status).toBe(500);
        expect(response.message).toBe('An error occurred');
      })
    });

    it('success will return the title', () => {
      const title = {key: 'value'};
      mediaServiceGetFirstCategoryStub.returns(Promise.resolve({}));
      mediaServiceGetLongestPreviewTitleStub.returns(Promise.resolve({}));
      mediaServiceGetPreviewTitleMediaStub.returns(Promise.resolve(title));

      const termId = 'termId';
      const req = {
        params: {termId: termId}
      }
      return termsController.longestPreview(req, response).then(() => {
        expect(response.jsonObject).toEqual(title);
      })
    });
  });
});