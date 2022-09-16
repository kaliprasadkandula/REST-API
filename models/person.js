const mongoose = require('mongoose');

const person_schema = new mongoose.Schema({
    name: { type: String, required: true},
    age: { type: Number, required: true },
    alive: { type: Boolean,default: true },
})

module.exports =mongoose.model('Person', person_schema);//exporting the schema as model