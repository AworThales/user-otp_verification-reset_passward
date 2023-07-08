import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
// import ENV from '../config.js'

async function connect(){

    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    const db = await mongoose.connect(getUri);
    // const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database Connected")
    return db;
}

export default connect;