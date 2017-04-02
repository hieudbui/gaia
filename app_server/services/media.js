let logger = require('../utils/logger');
let mediaApis = require('../apis/media_apis');

class Media {
  getFirstCategory(termId) {
    if (!termId) {
      return Promise.resolve(null);
    }
    return mediaApis.getCategories(termId).then((categories) => {
      return categories && categories.terms ? categories.terms[0] : null;
    });
  };

  getLongestPreviewTitle(category) {
    if (!category) {
      return Promise.resolve(null);
    }
    const categoryId = category.tid;
    return mediaApis.getTitles(categoryId).then((pageableTitleResults) => {
      const hasPreviewTitles = pageableTitleResults.titles.filter((t) => t.preview).sort((a, b) => b.preview.duration - a.preview.duration);
      const longestTitlePreview = hasPreviewTitles[0];
      if (longestTitlePreview) {
        return {
          titleId: longestTitlePreview.nid,
          previewTitleId: longestTitlePreview.preview.nid,
          duration: longestTitlePreview.preview.duration
        }
      }
      else {
        logger.error(`longest preview title not found for category id ${categoryId}`);
        return null;
      }
    });
  };

  getPreviewTitle(previewTitle) {
    if (!previewTitle) {
      return Promise.resolve(null);
    }
    const {previewTitleId, titleId, duration} = previewTitle;
    return mediaApis.getTitle(previewTitleId).then((title) => {
      if (title) {
        return {
          bcHLS: title.mediaUrls.bcHLS,
          titleNid: titleId,
          previewNid: previewTitleId,
          previewDuration: duration
        };
      }
      else {
        logger.error(`no title found for preview title id ${previewTitleId}`)
        return null;
      }
    });
  };
}

module.exports = new Media();