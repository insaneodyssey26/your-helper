import dotenv from "dotenv"; 
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ // to read the .env file
    path:'./.env'
});

connectDB() // to connect to the database
.then(()=>{
    app.on("error", (error)=>{ // to handle the error
        console.log("ERROR: ",error);
        throw error;
    });
    app.listen(process.env.PORT || 8000, ()=>{ // to listen to the port
        console.log("Server is running on ",process.env.PORT);
    })
})
.catch((error)=>{     // to catch the error
    console.log("MONGO DB Connection failed !!!!!!" , error);
    throw error;
})





/*
import express from "express"

const app = express();

;( async () => {
    try{
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       app.on("error", (error)=>{
        console.log("Error: ",error);
       });
       throw error;

       app.listen(process.env.PORT, ()=>{
        console.log("Server is running on ",process.env.PORT);
       })
    }
    catch(error){
        console.log("Error : ", error);
       throw error;
    }
}) ()
    
*/