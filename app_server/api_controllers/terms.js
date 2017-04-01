const logger = require('../utils/logger');
const mediaService = require('../services/media');

class TermsController {
  longestPreview(req, res) {
    const {termId} = req.params;
    const firstCategoryPromise = mediaService.getFirstCategory(termId);
    const longestPreviewTitlePromise = firstCategoryPromise.then(category => mediaService.getLongestPreviewTitle(category));
    const previewTitlePromise = longestPreviewTitlePromise.then(longestPreviewTitle => mediaService.getPreviewTitle(longestPreviewTitle));

    return Promise.all([firstCategoryPromise, previewTitlePromise, previewTitlePromise]).then((resolves) => {
      if (!resolves[0]) {
        res.status(404).send(`term ${termId} not found`);
      }
      else if (!resolves[1]) {
        res.status(404).send('longest preview title not found');
      }
      else if (!resolves[2]) {
        res.status(404).send('title not found');
      }
      else {
        res.json(resolves[2]);
      }
    }).catch((error) => {
      logger.error('TermsController.longestPreview', error);
      res.status(500).send('An error occurred');
    });

  }
}
module.exports = new TermsController();