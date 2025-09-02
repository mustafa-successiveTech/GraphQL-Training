import mongoose from "mongoose";

export const mongoDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Graphql");
        console.log("✅ MongoDB connected");
    } catch ( error ) {
        console.log("Error in mongoDB connection :", error);
    }
};