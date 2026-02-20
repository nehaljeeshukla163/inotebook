const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
.then(()=> console.log("Mongo connected"))
.catch(err => console.error(err))

}

module.exports = connectToMongo;