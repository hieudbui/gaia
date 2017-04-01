const sinon = require('sinon');
const expect = require('expect');

const mediaService = require('../../app_server/services/media');
const mediaApis = require('../../app_server/apis/media_apis');

describe('media', () => {

  let mediaApisMock;

  beforeEach(() => {
    mediaApisMock = sinon.mock(mediaApis);
  });

  afterEach(() => {
    mediaApisMock.restore();
  });

  describe('#getFirstCategory', () => {
    it('missing term id should return null', () => {
      return mediaService.getFirstCategory().then((category) => {
        expect(category).toNotExist();
      })
    });

    it('empty categories should return null', () => {
      let termId = 'termId';
      mediaApisMock.expects('getCategories').withArgs(termId).returns(Promise.resolve({}));
      return mediaService.getFirstCategory(termId).then((category) => {
        expect(category).toNotExist();
        mediaApisMock.verify();
      })
    });

    it('null categories should return null', () => {
      let termId = 'termId';
      mediaApisMock.expects('getCategories').withArgs(termId).returns(Promise.resolve(null));
      return mediaService.getFirstCategory(termId).then((category) => {
        expect(category).toNotExist();
        mediaApisMock.verify();
      })
    });
  });

  describe('#getPreviewTitle', () => {
    it('undefined preview title should return null', () => {
      return mediaService.getPreviewTitle().then((previewTitle) => {
        expect(previewTitle).toNotExist();
      })
    });

    it('no title should return null', () => {
      let previewTitle = {
        previewTitleId: 'previewTitleId',
        titleId: 'titleId',
        duration: 100
      }
      mediaApisMock.expects('getTitle').withArgs(previewTitle.previewTitleId).returns(Promise.resolve(null));
      return mediaService.getPreviewTitle(previewTitle).then((title) => {
        expect(title).toNotExist();
        mediaApisMock.verify();
      })
    });
  });
});