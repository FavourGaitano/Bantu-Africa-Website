import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import roomRouter from './src/routes/roomRoute.js';
import serviceRouter from './src/routes/serviceRoute.js';

dotenv.config();
const PORT = process.env.API_PORT || 3000;

const app = express();
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
}


//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));


//routes
app.use('/api', roomRouter);
app.use('/api', serviceRouter);


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT} `);
})
