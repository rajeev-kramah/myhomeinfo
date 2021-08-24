const result = {
  response(status, data, message,lastTab) {
    var response = {};
    switch (status) {
      case 200: // The request has succeeded.
        response = {
          statusText: message,
          status: 200,
          data: data,
          lastTab : lastTab
        };
        return response;
      case 404: //404 Not Found
        response = {
          statusText: message,
          status: 404
        };
        return response;
      case 500: //Internal server Error
        response = {
          status: 500,
          statusText: message,
          error: data
        };
        return response;
      case 422: // Empty field
        response = {
          status: 422,
          statusText: message
        };
        return response;
      default:
    }
  }
};
module.exports = result;
