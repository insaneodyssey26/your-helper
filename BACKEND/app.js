import express, { urlencoded } from 'express';
import cors from 'cors'; // for middleware
import cookieParser from 'cookie-parser';

const app = express(); 
const port = process.env.PORT || 6000;

app.use(cors({
oirigin:process.env.CORS_ORIGIN,
credentials:true, // to allow the cookies to be sent from the server
}));

app.use(express.json({ // to transform the incoming request to json
    limit:"20kb",
}));

app.use(express.urlencoded({ // to encode the data from URL
    extended:true, // to allow nested objects
    limit:"20kb",
}));

app.use(express.static("public")); // to serve the static files
app.use(cookieParser()); // to parse the cookies

// Routes import 
import userRouter from './routes/user.routes.js';

// Routes declaration
app.use('/api/v1/user', userRouter); // middleware to use the userRouter

app.listen(port,()=>{
    console.log("The server is ready")
});

export default app;