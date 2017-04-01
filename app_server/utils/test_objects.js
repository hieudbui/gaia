module.exports = {
  mockResponse: {
    json: function(jsonObject) {
      this.jsonObject = jsonObject;
    },
    status: function(status) {
      this.status = status;
      return this;
    },
    send: function(message) {
      this.message = message;
    },
    location: function(location) {
      this.location = location;
    }
  }
};