const express = require('express');
const DataBase = require('./config/DataBase');
const { Signup } = require('./Controllers/Signup');
const { Login } = require('./Controllers/Login');


const app = express();
const PORT = 4000;
app.listen(PORT,()=>{
    console.log('listening on port',PORT);
})

app.use(express.json())

DataBase.DbConnection();

app.post('/signup',Signup);
app.post('/login',Login);

app.get('/',(req,res)=>{
    res.send("hey there")
})