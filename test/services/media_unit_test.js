const sinon = require('sinon');
const expect = require('expect');

const mediaService = require('../../app_server/services/media');
const mediaApis = require('../../app_server/apis/media_apis');

describe('MediaService', () => {

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
      const termId = 'termId';
      mediaApisMock.expects('getCategories').withArgs(termId).returns(Promise.resolve({}));
      return mediaService.getFirstCategory(termId).then((category) => {
        expect(category).toNotExist();
        mediaApisMock.verify();
      })
    });

    it('null categories should return null', () => {
      const termId = 'termId';
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
      const previewTitle = {
        previewTitleId: 'previewTitleId',
        titleId: 'titleId',
        duration: 100
      };
      mediaApisMock.expects('getTitle').withArgs(previewTitle.previewTitleId).returns(Promise.resolve(null));
      return mediaService.getPreviewTitle(previewTitle).then((title) => {
        expect(title).toNotExist();
        mediaApisMock.verify();
      })
    });


    it('has title should return title with bcHLS media url', () => {
      const previewTitle = {
        previewTitleId: 'previewTitleId',
        titleId: 'titleId',
        duration: 100
      };
      const title = {
        mediaUrls: {
          bcHLS: 'http://somewhere.com'
        }
      }
      mediaApisMock.expects('getTitle').withArgs(previewTitle.previewTitleId).returns(Promise.resolve(title));
      return mediaService.getPreviewTitle(previewTitle).then((result) => {
        expect(result.titleNid).toBe(previewTitle.titleId)
        expect(result.previewNid).toBe(previewTitle.previewTitleId)
        expect(result.previewDuration).toBe(previewTitle.duration)
        expect(result.bcHLS).toBe(title.mediaUrls.bcHLS)
        mediaApisMock.verify();
      })
    });

  });

  describe('#getLongestPreviewTitle', () => {
    it('undefined category should return null', () => {
      return mediaService.getLongestPreviewTitle().then((previewTitle) => {
        expect(previewTitle).toNotExist();
      })
    });

    it('no preview should return null', () => {
      const categoryId = 'categoryId';
      const category = {
        tid: categoryId
      };
      const titleResults = {
        titles: [
          {
            nid: 'nid'
          }
        ]
      };
      mediaApisMock.expects('getTitles').withArgs(categoryId).returns(Promise.resolve(titleResults));
      return mediaService.getLongestPreviewTitle(category).then((title) => {
        expect(title).toNotExist();
        mediaApisMock.verify();
      })
    });

    it('has preview should return longest duration', () => {
      const categoryId = 'categoryId';
      const category = {
        tid: categoryId
      };

      const longestPreviewTitleResult = {
        nid: '2',
        preview: {
          nid: 'previewNid2',
          duration: 3
        }
      };
      const titleResults = {
        titles: [
          {
            nid: 'nid',
            preview: {
              nid: 'previewNid',
              duration: 1
            }
          },
          longestPreviewTitleResult
        ]
      };
      mediaApisMock.expects('getTitles').withArgs(categoryId).returns(Promise.resolve(titleResults));
      return mediaService.getLongestPreviewTitle(category).then((title) => {
        expect(title.titleId).toBe(longestPreviewTitleResult.nid);
        expect(title.previewTitleId).toBe(longestPreviewTitleResult.preview.nid);
        expect(title.duration).toBe(longestPreviewTitleResult.preview.duration);
        mediaApisMock.verify();
      })
    });

  });
});