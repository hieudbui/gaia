const sinon = require('sinon');
const expect = require('expect');
const mockery = require('mockery');
const _ = require('lodash');

describe('MediaApis', () => {

  let fetchStub = sinon.stub();
  let environmentGetGaiaURLStub;
  let mediaApis;
  const gaiaUrl = 'http://somewhere.com';

  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    //important to do this after mockery has clear the module cache
    const environment = require('../../app_server/utils/environment');
    environmentGetGaiaURLStub = sinon.stub(environment, 'getGaiaURL');
    environmentGetGaiaURLStub.returns(gaiaUrl);
  });

  after(() => {
    environmentGetGaiaURLStub.restore();
    mockery.disable();
  });

  beforeEach(() => {
    mockery.registerMock('node-fetch', fetchStub);
    mediaApis = require('../../app_server/apis/media_apis');
  });

  afterEach(() => {
    fetchStub.reset();
    mockery.deregisterMock('node-fetch');
  });

  describe('#getCategories', () => {
    it('success call will return json', () => {
      const termId = 'termId';
      const response = {json: sinon.stub()};
      fetchStub.returns(Promise.resolve(response));
      return mediaApis.getCategories(termId).then(() => {
        expect(fetchStub.callCount).toBe(1);
        expect(fetchStub.args[0][0]).toBe(`${gaiaUrl}/vocabulary/1/${termId}`);
        expect(fetchStub.args[0][1].headers.Accept).toBe('application/json');
        expect(response.json.callCount).toBe(1);
      })
    });

    it('failure call will not return json', () => {
      const termId = 'termId';
      const response = {json: sinon.stub()};
      fetchStub.returns(Promise.reject(response));
      return mediaApis.getCategories(termId).catch((error) => {
        expect(error.json.callCount).toBe(0);
      })
    });
  });
});