const express = require('express');
const DataBase = require('./config/DataBase');
const { Signup } = require('./Controllers/Signup');
const { Login } = require('./Controllers/Login');
const cors = require('cors');

const app = express();
const PORT = 4000;
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
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