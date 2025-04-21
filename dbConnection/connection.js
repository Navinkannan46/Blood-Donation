const mongoose = require("mongoose")
const coonection=process.env.MONGODB

mongoose.connect(coonection).then(res=>{
    console.log("mongo connected");
}).catch(err=>{
    console.log("mongo connection failed");
    console.log(err);
})