const AWS = require('aws-sdk')
const s3 = new AWS.S3()

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
exports.getByIdHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
  const id = event.pathParameters.id;

  const params = {
    Bucket: 'manager-mobile-s3-pdfs',
    Key: id,
    Expires: 60 * 1000
  }

  if (event.queryStringParameters && event.queryStringParameters.raw) {
    const url = s3.getSignedUrl('getObject', params)
    console.log(url)
    const response = {
      statusCode: 302,
      headers: {'Location': url, 'Access-Control-Allow-Origin': '*'}
    }
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response
  }

  const response = {
    statusCode: 200,
    headers: {'content-type': 'text/html'},
    body: `<iframe
              id="ifamePdf"              
              src="https://docs.google.com/viewerng/viewer?url=https://tqdeegmk8f.execute-api.us-east-1.amazonaws.com/Prod/${id}%3fraw=true&embedded=true"
              height="600"
            ></iframe>`
  }

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response
}
