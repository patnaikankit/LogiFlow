import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log(`Database is connected at ${mongoose.connection.host}`);
        })
        .catch((err) => {
            console.log("Error -> ", err);
        });
}