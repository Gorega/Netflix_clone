import {MongoClient} from "mongodb"

export const connectToDataBase = async ()=>{
    const connect = await MongoClient.connect("mongodb+srv://Alawael:1777@cluster0.zmdfp.mongodb.net/NETFLIX?retryWrites=true&w=majority");
    return connect;
}