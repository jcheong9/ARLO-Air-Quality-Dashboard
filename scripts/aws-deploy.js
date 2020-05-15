const cleanBucket = require('./clean-s3bucket');
const uploadBucket = require('./upload-s3bucket');
const invalidate = require('./invalidate-cdn');
const config = require('./config');
var AWS = require('aws-sdk'); 

AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.region = process.env.AWS_DEFAULT_REGION;

async function deployDashboard(){
    try{
        
        console.log("deleting files in s3 bucket...");
        await cleanBucket.cleanBucket(config.BUCKET_NAME);
        console.log("uploading files in s3 bucket...");
        await uploadBucket.uploadBucket();
        console.log("Invalidating from cloudFront...");
        await invalidate.invalidateDistribution();
    }catch(err){
        console.log(err);
    }
   
}

deployDashboard();