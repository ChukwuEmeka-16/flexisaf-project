const express = require('express');
const router = express.Router()
const pool = require('../DB')
const jwt = require('jsonwebtoken');
require('dotenv').config()

// login page
router.post('/login',(request,response)=>{

    const SQL = 'SELECT * FROM users WHERE email = (?)';
    const email = request?.body?.email;
    const password = request?.body?.password;

   try {

    pool.query(SQL,[email],(error,result)=>{
      
        if(result.length < 1){
            response.status(200).send({success:false,message:'An account with this email does not exist.'})
        }
        else{

         if(result[0].password === password){

            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign({email:result[0].email},secretKey,{expiresIn:'12h'})
           
            
           

            response.status(200).send({success:true,message:`Successful login, welcome ${result[0].username}.`,token:token})
         }
         else{
            response.status(200).send({success:false,message:'The password entered is incorrect '})
         }
        }

    })}


   catch (e) {
    console.log(e);
    response.status(500).send({success:false,message:"Server error, Please try again later."})
   }
   
})


// signup page
router.post('/signup', (request,response)=>{

    const SQL = 'INSERT INTO users(username,email,password) VALUES (?,?,?)';
    const emailSQL = 'SELECT * FROM users WHERE email = (?)';
    const username = request?.body?.username;
    const email = request?.body?.email;
    const password = request?.body?.password;
    

    try{
     // check if a user with the given email already exists

     pool.query(emailSQL,[email],(error,result)=>{
        if(result.length > 0){
            response.status(200).send({success:false,message:'An account with this email already exists.'})
        }
  
        else{
        // since no user exists , this creats a new user
         pool.query(SQL,[username,email,password],(error,result)=>{
        
         response.status(200).send({success:true,message:'Account created successfully.'}) })

        }
     })

    
    }
    catch(e){
        console.log(e);
        response.status(500).send({success:false,message:"Server error, Please try again later."})

    }

   

})

module.exports = router;