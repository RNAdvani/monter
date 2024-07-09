import mongoose from "mongoose";
import config from "../config";

export const connectDB = async () => {
    try{
        mongoose.connect(config.MONGO_URI!, {
            dbName: config.DB_NAME!,
        }).then(() => {
            console.log("Database connected");
        }).catch(err => {
            console.log(err);
        })
    }catch(error){
        console.log(error);
    }
}