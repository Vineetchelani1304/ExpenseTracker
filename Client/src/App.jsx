import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/SignupForm';
import Login from './components/LoginForm';
import CreateExpense from './components/expense/CreateExpense';
import CreateShare from './components/expense/CreateShare';
import CreatePersonal from './components/expense/CreatePersonal';
import UserExpenses from './components/expense/UserExpenses';
import ExpenseDetails from './components/expense/GetExpenseDetails';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { BarChart } from 'recharts';
import Rootlayout from './components/layout/Rootlayout';
import Home from './components/Home';


const App = () => {
  const token = localStorage.getItem('token');
  return (
              <Routes>
                <Route path="/" element={<Home/>}/>
              <Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<Rootlayout/>}>

                <Route path="/createExpense" element={<CreateExpense />} />
                <Route path="/createShare" element={<CreateShare />} />
                <Route path="/createPersonal" element={<CreatePersonal />} />
                <Route path="/userExpenses" element={<UserExpenses />} />
                <Route path="/expenses/:expenseId" element={<ExpenseDetails />} />
                <Route path="/bargraph" element={<BarChart />} />

              </Route>
            </Routes>
      
  )


};

export default App;
