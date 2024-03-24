import ejs from 'ejs';

import { sendMail } from '../helpers/emailHelpers.js'
import { poolRequest } from '../utils/dbConnect.js';

export const welcomeUser= async()=>{

    const users=await (await poolRequest().query('SELECT * FROM Users WHERE IsConfirmed=0')).recordset

    console.log("users",users);

    for(let user of users)
{
    ejs.renderFile('templates/welcomeUser.ejs', {FirstName: user.FirstName, LastName: user.LastName}, async (error, data)=>{
        let mailOptions={
            from : process.env.Email,
            to: user.Email,
            subject: "Welcome Bantu Africa Resort Management !",
            html: data
        }
        try{
            await sendMail(mailOptions)

            await poolRequest().query('UPDATE Users SET IsConfirmed = 1 WHERE welcomed = 0')

            console.log('Emails send to new Users');
            
        }catch(error){
            console.log(error);
            
        }
    })
}    
}