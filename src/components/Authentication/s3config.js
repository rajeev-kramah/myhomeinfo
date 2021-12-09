const userBucket = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).bucket_folder_name;
const config = {
    bucketName: "myhomeinfodata",
    dirName: userBucket,
    region: "us-west-2",
    accessKeyId: "AKIAW4MIDXMBR2LANW4B", 
    secretAccessKey: "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", 
  };
  export default config;