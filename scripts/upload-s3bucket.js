
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const mimeType = require('mime-types');
const s3 = new AWS.S3();

function uploadArtifactsToS3() {

    const testResultsPath = '../build';

    const uploadSubfiles = (currentDirPath, callback) => {
        fs.readdirSync(currentDirPath).forEach((name) => {
            const filePath = path.join(currentDirPath, name);
            const stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                uploadSubfiles(filePath, callback);
            }
        });
    };

    uploadSubfiles(testResultsPath, async (filePath) => {
        let bucketPath = filePath.substring(testResultsPath.length+1);
        let newBucketPath = bucketPath.replace(/\\/g, "/"); //Replaces \ to / 
        let params = {
            Bucket: config.BUCKET_NAME,
            Key: newBucketPath,
            Body: fs.readFileSync(filePath),
            ContentType: mimeType.lookup(filePath),
            ACL: 'public-read'
        };
        console.log(filePath + " "+ mimeType.lookup(filePath));
        try {
            await s3.putObject(params).promise();
            console.log(`Successfully uploaded ${newBucketPath} to s3 bucket`);
        } catch (error) {
            console.error(`error in uploading ${newBucketPath} to s3 bucket`);
            throw new Error(`error in uploading ${newBucketPath} to s3 bucket`);
        }
    });
}

module.exports.uploadBucket = uploadArtifactsToS3;