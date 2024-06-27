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

const App = () => {
  const token = localStorage.getItem('token');
  return (
    <div className="relative overflow-hidden min-h-screen">
      {token && (
        <div className="flex">
          <div className="w-[20%] border-2 border-slate-300 fixed h-full">
            <SideBar />
          </div>
          <div className="ml-[20%] w-full">
            <Navbar />
            <div className="p-4">
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/createExpense" element={<CreateExpense />} />
                <Route path="/createShare" element={<CreateShare />} />
                <Route path="/createPersonal" element={<CreatePersonal />} />
                <Route path="/" element={<UserExpenses />} />
                <Route path="/expenses/:expenseId" element={<ExpenseDetails />} />
                <Route path="/bargraph" element={<BarChart />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
      {!token && (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
