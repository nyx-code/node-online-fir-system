require("dotenv/config")

module.exports = {
    mongoURL: process.env.MONGO_URL,
    twilio: {
        accountSID : process.env.ACCOUNT_SID,
        authToken : process.env.AUTH_TOKEN,
        serviceId : process.env.SERVICE_ID
    },
    jwtSecret: process.env.JWT_SECRET,
    dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY,
    aws: {
        awsSecret: process.env.AWS_SECRET,
        awsS3BucketName: process.env.AWS_BUCKET_NAME,
        awsID: process.env.AWS_ID
    }
}