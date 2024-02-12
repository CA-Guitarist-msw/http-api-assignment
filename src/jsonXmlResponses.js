const basicResponse = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const successResponse = (request, response, acceptedType) => {
  const content = {
    message: 'Response success',
  };

  if (acceptedType[0] === 'text/xml') {
    const responseXml = `<response><message>${content.message}</message></response>`;
    return basicResponse(request, response, 200, responseXml, 'text/xml');
  }

  const responseJson = JSON.stringify(content);
  return basicResponse(request, response, 200, responseJson, 'application/json');
};

const badRequest = (request, response, params, acceptedType) => {
  const content = {
    message: 'Bad request',
  };

  if (!params.valid || params.valid !== 'true') {
    content.message = 'Missing valid query parameters';
    content.id = 'badRequest';

    if (acceptedType === 'text/xml') {
      const responseXml = `<response><message>${content.message}</message><id>${content.id}</id></response>`;
      return basicResponse(request, response, 400, responseXml, 'text/xml');
    }

    const responseJson = JSON.stringify(content);
    return basicResponse(request, response, 400, responseJson, 'application/json');
  }

  if (acceptedType === 'text/xml') {
    const responseXml = `<response><message>${content.message}</message></response>`;
    return basicResponse(request, response, 200, responseXml, 'text/xml');
  }

  const responseJson = JSON.stringify(content);
  return basicResponse(request, response, 200, responseJson, 'application/json');
};

const unauthorized = (request, response, params, acceptedType) => {
  const content = {
    message: 'Unauthorized',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    content.message = 'Missing valid query parameters';
    content.id = 'unauthorized';

    if (acceptedType === 'text/xml') {
      const responseXml = `<response><message>${content.message}</message><id>${content.id}</id></response>`;
      return basicResponse(request, response, 401, responseXml, 'text/xml');
    }

    const responseJson = JSON.stringify(content);
    return basicResponse(request, response, 401, responseJson, 'application/json');
  }

  if (acceptedType === 'text/xml') {
    const responseXml = `<response><message>${content.message}</message></response>`;
    return basicResponse(request, response, 200, responseXml, 'text/xml');
  }

  const responseJson = JSON.stringify(content);
  return basicResponse(request, response, 200, responseJson, 'application/json');
};

const forbidden = (request, response, acceptedType) => {
  const content = {
    message: 'You do not have access to this',
    id: 'forbidden',
  };

  if (acceptedType === 'text/xml') {
    const responseXml = `<response><message>${content.message}</message><id>${content.id}</id></response>`;
    return basicResponse(request, response, 403, responseXml, 'text/xml');
  }

  const responseJson = JSON.stringify(content);
  return basicResponse(request, response, 403, responseJson, 'application/json');
};

const internalError = (request, response, acceptedType) => {
  const content = {
    message: 'Internal Server Error',
    id: 'internalError',
  };

  if (acceptedType === 'text/xml') {
    const responseXml = `<response><message>${content.message}</message><id>${content.id}</id></response>`;
    return basicResponse(request, response, 500, responseXml, 'text/xml');
  }

  const responseJson = JSON.stringify(content);
  return basicResponse(request, response, 500, responseJson, 'application/json');
};

const notImplemented = (request, response, acceptedType) => {
  const content = {
    message: 'A request for this page has not been implemented',
    id: 'notImplemented',
  };

  if (acceptedType === 'text/xml') {
    const responseXml = `<response><message>${content.message}</message><id>${content.id}</id></response>`;
    return basicResponse(request, response, 501, responseXml, 'text/xml');
  }

  const responseJson = JSON.stringify(content);
  return basicResponse(request, response, 501, responseJson, 'application/json');
};

const notFound = (request, response, acceptedType) => {
  const content = {
    message: 'This page was not found',
    id: 'notFound',
  };

  if (acceptedType === 'text/xml') {
    const responseXml = `<response><message>${content.message}</message><id>${content.id}</id></response>`;
    return basicResponse(request, response, 404, responseXml, 'text/xml');
  }

  const responseJson = JSON.stringify(content);
  return basicResponse(request, response, 404, responseJson, 'application/json');
};

module.exports.basicResponse = basicResponse;
module.exports.successResponse = successResponse;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internalError = internalError;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;