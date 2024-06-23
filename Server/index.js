const express = require('express');
const DataBase = require('./config/DataBase');
const { Signup } = require('./Controllers/Signup');
const { Login } = require('./Controllers/Login');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/auth');
const { createExpense, SettleExpense, getUserExpenses, getExpenseDetails } = require('./Controllers/Expense');
const { createShare, CreatePersonal } = require('./Controllers/Category');

const app = express();
const PORT = 4000;
app.use(cookieParser());
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
app.post('/createExpense',auth,createExpense);
app.post('/createShare',auth,createShare);
app.post('/createPersonal',auth,CreatePersonal);
app.delete('/settleExpense',auth,SettleExpense);
app.get('/getUserExpenses',auth,getUserExpenses);
app.get('/expenses/:expenseId',auth, getExpenseDetails);
app.get('/',(req,res)=>{
    res.send("hey there")
})