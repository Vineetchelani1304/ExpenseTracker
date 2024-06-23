import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/SignupForm';
import Login from './components/LoginForm';
import CreateExpense from './components/expense/CreateExpense';
import CreateShare from './components/expense/CreateShare';
import CreatePersonal from './components/expense/CreatePersonal';
import UserExpenses from './components/expense/UserExpenses';


const App = () => {
  return (
    <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/createExpense" element={<CreateExpense/>}/>
        <Route path="/createShare" element={<CreateShare/>}/>
        <Route path="/createPersonal" element={<CreatePersonal/>}/>
        <Route path="/userExpenses" element={<UserExpenses/>}/>
    </Routes>
  );
};

export default App;
