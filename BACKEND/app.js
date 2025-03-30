import express, { urlencoded } from 'express';
import cors from 'cors'; // for middleware
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express(); 
const port = process.env.PORT || 6000;

// Configure base URL
const api = axios.create({
    baseURL: `http://localhost:${port}/api`,
    headers: {
      'Content-Type': 'application/json'
    }
});

// Add auth interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add auth interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

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
import CustomerRouter from './routes/Customer.route.js';

// Routes declaration
app.use('/api/signup', CustomerRouter); // middleware to use the userRouter

app.listen(port,()=>{
    console.log("The server is ready")
});

export default app;