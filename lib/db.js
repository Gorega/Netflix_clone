import {MongoClient} from "mongodb"

export const connectToDataBase = async ()=>{
    const connect = await MongoClient.connect(process.env.DB_CONNECTION_STRING);
    return connect;
}