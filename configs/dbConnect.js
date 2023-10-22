import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT, {
            useNewUrlParser: true, useUnifiedTopology: true
        })
            .then(() => {
                console.log("MongoDB connected successfully!");
            })
    } catch (error) {
        console.error(error.message);
    }
}


