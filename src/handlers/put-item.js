const AWS = require('aws-sdk');
const Reports = require("fleetmap-reports");
const s3 = new AWS.S3();

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
    console.info('received:', event);
    if (event.httpMethod !== 'POST') {
        const body = JSON.parse(event.body)
        const pdf = await new Reports({baseOptions: null})[event.queryStringParameters.reportType + 'ReportToPDF'](body.userData, body.reportData)
        event.body = pdf.output('datauristring')
    }
    const params = {
        Bucket: 'manager-mobile-s3-pdfs',
        Key: event.pathParameters.id,
        Body: Buffer.from(event.body.split(',')[1], 'base64'),
        ContentType: 'application/pdf'
    };
    await s3.putObject(params).promise()
    const response = {
        statusCode: 200,
        headers: {'Access-Control-Allow-Origin': '*'}
    }
    console.info(`response from: ${event.path} statusCode: ${response.statusCode}`)
    return response
};
