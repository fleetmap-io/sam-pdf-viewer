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
    Expires: 600 * 1000
  }


    const url = s3.getSignedUrl('getObject', params)
    console.log(url)
    const response = {
      statusCode: 302,
      headers: {'Location': url, 'Access-Control-Allow-Origin': '*'}
    }
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response
}
