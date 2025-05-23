const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: true,

        });

        console.log(`MongoDB connected:${conn.connection.host}`);

    } catch (error) {
        console.log(`error:${error.message}`);
        process.exit();
    }
};


module.exports = connectDB;