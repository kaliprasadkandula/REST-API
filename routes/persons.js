const express = require('express');
const router= express.Router();
const body_parser = require('body-parser');
const jsonParser=body_parser.json();
const Person =require('../models/person')//person schema is imported 


router.get('/', async(req,resp)=>{
    try{
        const persons = await Person.find()     //here .find() is inbuilt mongoose function 
        resp.json(persons)//sending the persons in json format 
    }catch(e){
        resp.send('error:'+e);
    }
     
}); //to get all persons
router.get('/:id', async(req,resp)=>{
    const rm=req.params
    try{
        const person= await Person.findById(rm.id)     //here .find() is inbuilt mongoose function 
        resp.json(person)//sending the persons in json format 
    }catch(e){
        resp.send('error:'+e);
    }
     
}); //to get specific person with help of ID 

router.patch('/:id', async(req,resp)=>{
    const rm=req.params
    try{
        const person= await Person.findById(rm.id) 
        person.alive=!person.alive    //toggling the person 
        const resp_data= await person.save()
        resp.json(resp_data)//sending the persons in json format 
    }catch(e){
        resp.send('error:'+e);
    }
     
}); //to patch person with help of ID 

router.delete('/:id', async(req,resp)=>{
    const rm=req.params
    try{
        const resp_data= await Person.findByIdAndRemove(rm.id) 
        resp.json(resp_data)
    }
    catch(e){ 
        resp.send('error:'+e);  
    }
}) //to delete person with help of ID 
router.post('/',jsonParser, async(req,resp)=>{
   const rb=req.body
   
    const person=new Person(
        {
            name: req.body.name,
            age: rb.age,
            alive: rb.alive,
        }
    );
    try{
        const resp_data = await person.save()     //here .save() is inbuilt mongoose function 
        resp.json(resp_data)//sending the persons in json format 
    }catch(e){
        resp.send('error:'+e);
    }
     
}); //to add the person to the collection dont forget the jsonparser function
module.exports = router //this is important