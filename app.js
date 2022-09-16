const express=require('express')
const mongoose = require('mongoose')

const app = express();
const url='mongodb://localhost/PersonDB' // MongoDB database name
const port= 9000; 
mongoose.connect(url, {useNewUrlParser:true})  //this {useNewUrlParser:true} is to avoid unnecessary warnings 
const con=mongoose.connection //now express is connected to the database,now in con variable we have a connection object

const persons_route=require('./routes/persons') 
app.use('/persons', persons_route) //telling that all persons are routed to the persons_route database


con.on('open', ()=>{        //this function is an event handler it activates when the connection is opened
    console.log('Connected to database')
}) 
app.listen(port,()=>{ 
    console.log(`Listening on port ${port}`)
})