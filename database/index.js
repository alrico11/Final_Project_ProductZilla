const mongoose = require('mongoose');
require('dotenv').config();

async function connect(){
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    });
    
    const db = mongoose.connection;
    db.on('error',console.error.bind(console,"MongoDB Error"));
    db.once('open',()=>{
        console.log("MONGODB CONNECTED")
    })
}

async function disconnect(){
    await mongoose.disconnect();
}

async function clearDB() {
    for (const collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].deleteMany({});
    }
    return done();
}
module.exports = {connect, disconnect,clearDB}