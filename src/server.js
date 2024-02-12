const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonXmlHandler = require('./jsonXmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonXmlHandler.successResponse,
  '/badRequest': jsonXmlHandler.badRequest,
  '/unauthorized': jsonXmlHandler.unauthorized,
  '/forbidden': jsonXmlHandler.forbidden,
  '/internal': jsonXmlHandler.internalError,
  '/notImplemented': jsonXmlHandler.notImplemented,
  notFound: jsonXmlHandler.notFound,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedType = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    return urlStruct[parsedUrl.pathname](request, response, params, acceptedType);
  }

  return urlStruct.notFound(request, response, params, acceptedType);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening of 127.0.0.1:${port}`);
});
