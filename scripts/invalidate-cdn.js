const AWS = require('aws-sdk');
const config = require('./config');
const cloudfront = new AWS.CloudFront();

let params = {
    DistributionId: config.DISTRIBUTION_ID,
    InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
            Quantity: 1,
            Items: [
                '/*'
            ]
        }
    }
};

async function invalidateDistribution() {
    console.log("Invalidating CloudFront distribution ID: " + config.DISTRIBUTION_ID);
    cloudfront.createInvalidation(params, (err, data) => {
        if (err) {
            console.log("Error while invalidating.. " + err);
        } else {
            console.log("Invalidation successful, " + data);
        }

    })
}

module.exports.invalidateDistribution = invalidateDistribution;