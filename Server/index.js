const express = require('express');
const DataBase = require('./config/DataBase');
const { Signup } = require('./Controllers/Signup');
const { Login } = require('./Controllers/Login');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/auth');
const { createExpense, SettleExpense, getUserExpenses, getExpenseDetails } = require('./Controllers/Expense');
const { createShare, CreatePersonal } = require('./Controllers/Category');
const { deleteHistory, GetAllSettlements } = require('./Controllers/History');
// const { generateQRCode } = require('./Controllers/Payment');

const app = express();
const PORT = 4000;
app.use(cookieParser());
// Enable preflight for all routes
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://viexpensetracker-vineet-chelanis-projects.vercel.app',
        'https://d3gbpcotpq0cgl.cloudfront.net'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.listen(PORT, () => {
    console.log('listening on port', PORT);
})

app.use(express.json())

DataBase.DbConnection();

app.post('/signup', Signup);
app.post('/login', Login);
app.post('/createExpense', auth, createExpense);
app.post('/createShare', auth, createShare);
app.post('/createPersonal', auth, CreatePersonal);
app.post('/settleExpense', auth, SettleExpense); // Change to POST
app.get('/getUserExpenses', auth, getUserExpenses);
app.get('/getSettlements', auth, GetAllSettlements);
app.get('/expenses/:expenseId', auth, getExpenseDetails);
app.delete('/deleteHistory', auth, deleteHistory);
// app.post('/generate-qrcode', generateQRCode);
app.get('/', (req, res) => {
    res.send("hey there")
})
