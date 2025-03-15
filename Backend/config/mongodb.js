import mongoose from 'mongoose';

const connectDB = (uri) => {
    console.log("MONGODB_URL:", uri); // Debugging to ensure the correct URI is passed

    mongoose.connect(uri)
        .then(() => {
            console.log("Successfully connected to MongoDB");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
};

export default connectDB;
