import express from 'express';
import dotenv from 'dotenv';
import logger from './src/utils/loggers.js'
import { welcomeUser } from './src/mailServices/welcomeUser.js';
import cron from 'node-cron'

dotenv.config();
const app=express();



const PORT=process.env.PORT || 5000






const run = async()=>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('Checking for a new user');
        
        await welcomeUser()
        
        
    })
    
}

run()

app.listen(PORT,()=>{
    logger.info(`This App is running on port : ${PORT}`);
})