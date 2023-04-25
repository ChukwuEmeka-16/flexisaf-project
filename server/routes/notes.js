const express = require('express');
const router = express.Router()
const pool = require('../DB')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const mysql = require('mysql')

// add a note
router.post('/create',(request,response)=>{
    const token = request?.body?.token;
    const decoded = jwt.decode(token);
    const email = decoded?.email
    const id  = request.body.id
    const title = request.body.title
    const note = request.body.note
    const created = mysql.raw('NOW()')
    const SQL = 'INSERT INTO notes (id,title,note,created,user) VALUES(?,?,?,?,?)'

    try { 
        pool.query(SQL,[id,title,note,created,email],(error,result)=>{
    
         if(result?.affectedRows > 0){
            response.status(200).send({success:true,message:'Note added successfully.'})
         }else if(result?.affectedRows < 1) {
            response.status(400).send({success:false,message:'Error creating note, Please try again.'})
         }
        })
    } 
    catch (error) {
     console.log(error);
     response.status(500).send({success:false,message:"Server error, Please try again later."})
    }

})

//get all notes for the library
router.post('/library',(request,response)=>{
 const token = request?.body?.token;
 const decoded = jwt.decode(token);
 const email = decoded?.email
 const SQL = 'SELECT * FROM notes where user = (?)'

 try {
    pool.query(SQL,[email],(error,result)=>{
       if (result?.length <1) {
        response.status(200).send({success:false,message:'No items found'});
       }else{
        response.status(200).send({success:true,notes:result});
       }
    })
 } 
 catch (error) {
    console.log(error);
    response.status(500).send({success:false,message:"Server error, Please try again later."})
 }

})

// get all notes for searching

router.post('/',(request,response)=>{
    const token = request?.body?.token;
    const decoded = jwt.decode(token);
    const email = decoded?.email
    const SQL = 'SELECT * FROM notes where user = (?)'
   
    try {
       pool.query(SQL,[email],(error,result)=>{
          if (result?.length <1) {
           response.status(200).send({success:false,message:'No items found'});
          }else{
           response.status(200).send({success:true,notes:result});
          }
       })
    } 
    catch (error) {
        console.log(error);
        response.status(500).send({success:false,message:"Server error, Please try again later."})
    }
   
   })
   

// get recent 7 notes 

router.post('/recent',(request,response)=>{
    const token = request?.body?.token;
    const decoded = jwt.decode(token);
    const email = decoded?.email
    const SQL = 'SELECT * FROM notes where user = (?) ORDER BY id DESC LIMIT 7'
     
    try {
        pool.query(SQL,[email],(error,result)=>{
            if(result.length < 1){
              response.status(200).send({success:false,message:'No recent items'})         
            }
            else{
              response.status(200).send({success:true,notes:result})      
            }
        }) 
    } 
    catch (error) {
        console.log(error);
        response.status(500).send({success:false,message:"Server error, Please try again later."})
    }
})


// update a note
router.post('/update',(request,response)=>{
  const id = request?.body?.id;
  const newNote = request?.body?.newNote;
  const SQL = 'UPDATE notes SET note = ? WHERE id = ?'

  try {
    pool.query(SQL,[newNote,id],(error,result)=>{
        if(result.affectedRows > 0){
            response.status(200).send({success:true,message:'Note updated successfully.'})
        }
        else if (result.affectedRows < 1){
            response.status(400).send({success:false,message:'Error updating note, Please try again later.'})
        }
    })
  } 
  catch (error) {
    console.log(error);
    response.status(500).send({success:false,message:"Server error, Please try again later."})
  }
})

//delete a note

router.post('/delete',(request,response)=>{
    const id = request.body.id
    const SQL ='DELETE FROM notes WHERE id = (?)'
    
   try {
     pool.query(SQL,[id],(error,result)=>{
        if(result.affectedRows > 0){
            response.status(200).send({success:true,message:'Note deleted successfully.'})
        }
        else if (result.affectedRows < 1){
            response.status(400).send({success:false,message:'Error deleting note, Please try again later.'})
        }
     })
   } 
   catch (error) {
     console.log(error);
     response.status(500).send({success:false,message:"Server error, Please try again later."})
   }
})

module.exports = router;