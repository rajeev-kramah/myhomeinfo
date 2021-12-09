const userBucket = JSON.parse(localStorage.getItem('user')).bucket_folder_name;
const config = {
    bucketName: "myhomeinfo-s3",
    dirName: userBucket,
    region: "us-east-1",
    accessKeyId: "AKIAW4MIDXMBWXP4KXY3", 
    secretAccessKey: "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", 
  };
  export default config;