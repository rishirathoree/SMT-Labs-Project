const { mongoose } = require("mongoose");
require("dotenv").config();
const urlDB = process.env.MONGO_URL || "mongodb://localhost:27017/inventory-app";

const createConnection = async () => {
    try {
        await mongoose.connect(urlDB);
        console.log("Database connected");
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createConnection
}