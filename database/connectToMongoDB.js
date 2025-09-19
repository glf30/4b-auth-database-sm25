const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToMongoDB = async () => {
    mongoose.set("strictQuery", false)
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.log("DB Connection failed")
    }
}

module.exports = connectToMongoDB;