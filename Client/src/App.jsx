import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/SignupForm';
import Login from './components/LoginForm';
import CreateExpense from './components/CreateExpense';


const App = () => {
  return (
    <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/createExpense" element={<CreateExpense/>}/>
    </Routes>
  );
};

export default App;
