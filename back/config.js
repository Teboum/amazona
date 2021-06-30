const dotenv=require("dotenv");
dotenv.config();

module.exports= {
  MONGODB_URL:
    process.env.MONGODB_URL||"mongodb://admin:tEWvuv3T2xqlVwjJ@cluster0-shard-00-00.bvtoz.mongodb.net:27017,cluster0-shard-00-01.bvtoz.mongodb.net:27017,cluster0-shard-00-02.bvtoz.mongodb.net:27017/amazona?ssl=true&replicaSet=atlas-teegw9-shard-0&authSource=admin&retryWrites=true&w=majority" ,
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
};
