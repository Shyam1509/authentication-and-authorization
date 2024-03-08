const mongoose = require("mongoose")

const dbConnection = async () => {
    await mongoose.connect(process.env.DB_URL)
        console.log("Database is connected");

}

module.exports = dbConnection