const AWS = require('aws-sdk');
const s3 = new AWS.S3();

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    console.info('received:', event);

    console.log('datauri', event.body)


    const params = {
        Bucket: 'manager-mobile-s3-pdfs',
        Key: event.pathParameters.id,
        Body: new Buffer(event.body.split(',')[1], 'base64'),
        ContentType: 'application/pdf'
    };
    await s3.putObject(params).promise()

    const response = {
        statusCode: 200,
        headers: {'Access-Control-Allow-Origin': '*'}
    }

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode}`)
    return response
};
