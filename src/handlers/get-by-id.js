const AWS = require('aws-sdk');
const s3 = new AWS.S3();

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
  }

  const o = await s3.getObject(params).promise()
  const response = {
    statusCode: 200,
    headers: {'content-type': 'text/html'},
    body: `<html lang="pt">
                <iframe id="theFrame" style="padding: 0; border:0; width:100%; height: 100%" src="${o.Body}" />
           </html>
          <script>
          document.getElementById("theFrame").contentWindow.onload = function() {
              this.document.getElementsByTagName("img")[0].style.width="100%";
              this.document.getElementsByTagName("img")[0].style.height="100%";
          };
          </script>`
  }

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response
}
exports.getPdfHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
  const id = event.pathParameters.id;
  const params = {
    Bucket: 'manager-mobile-s3-pdfs',
    Key: id,
  }

  const o = await s3.getObject(params).promise()
  const response = {
    statusCode: 200,
    headers: {'content-type': 'application/pdf'},
    body: o.Body
  }

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response
}
