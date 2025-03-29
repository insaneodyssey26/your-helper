import mongoose from "mongoose";
import {DB_NAME} from "../constants.js" // to import the constant

const connectDB = async () => {
     try { 
        const conectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`); // to connect to the database
        console.log(`Database connected successfully || DB HOST: ${conectionInstance.connection.host}`); // to show the message
     } catch (error) {
        console.log("ERROR: ",error);
        process.exit(1); // to exit the process
     }
}

export default connectDB;