const express = require('express');
const DataBase = require('./config/DataBase')


const app = express();
const PORT = 4000;
app.listen(PORT,()=>{
    console.log('listening on port',PORT);
})

DataBase.DbConnection();

app.get('/',(req,res)=>{
    res.send("hey there")
})