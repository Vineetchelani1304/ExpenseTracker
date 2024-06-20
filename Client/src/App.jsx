import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/SignupForm';
import Login from './components/LoginForm';


const App = () => {
  return (
    <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/" element={<Home/>}/> */}
    </Routes>
  );
};

export default App;
