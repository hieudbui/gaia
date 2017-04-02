const fetch = require('node-fetch');
const environment = require('../utils/environment');
const logger = require('../utils/logger');

const HEADERS = {
  'Accept': 'application/json'
};

class MediaApis {
  getCategories(termId) {
    const getMediaCategoriesURI = `${environment.getGaiaURL()}/vocabulary/1/${termId}`;
    return fetch(getMediaCategoriesURI, {
      headers: HEADERS
    }).then((response) => {
      return response.json();
    })
  }

  getTitles(categoryId) {
    const getTitlesURI = `${environment.getGaiaURL()}/videos/term/${categoryId}`;
    return fetch(getTitlesURI, {
      headers: HEADERS
    }).then((response) => {
      return response.json();
    })
  }

  getMedia(titleId) {
    const getTitleURI = `${environment.getGaiaURL()}/media/${titleId}`;
    return fetch(getTitleURI, {
      headers: HEADERS
    }).then((response) => {
      return response.json();
    })
  }
}

module.exports = new MediaApis();