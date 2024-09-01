const mongoose = require ('mongoose')
const DBHOST = process.env.DBHOST;
//const db = 'mongodb://localhost:27017/puser';
var con = mongoose.connect(DBHOST)
.then((data)=>{
    console.log('db connected to mongo atlas')
}).catch((err)=>console.error(err))

module.exports=con;
console.log('db ready');
