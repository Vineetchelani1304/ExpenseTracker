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
  return (
    <div className="  relative overflow-hidden">
      <div className=" flex flex-row">
        <div className=' w-[20%] border-2 border-slate-300 fixed h-full  '>
          <SideBar/>
        </div>
        <div className='ml-[20%]'>
          <Navbar/>
        </div>
      </div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createExpense" element={<CreateExpense />} />
        <Route path="/createShare" element={<CreateShare />} />
        <Route path="/createPersonal" element={<CreatePersonal />} />
        <Route path="/" element={<UserExpenses />} />
        <Route path="/expenses/:expenseId" element={<ExpenseDetails />} />
        <Route path="/bargraph" element={<BarChart/>} />
      </Routes>
    </div>
  );
};

export default App;




// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Signup from './components/SignupForm';
// import Login from './components/LoginForm';
// import CreateExpense from './components/expense/CreateExpense';
// import CreateShare from './components/expense/CreateShare';
// import CreatePersonal from './components/expense/CreatePersonal';
// import UserExpenses from './components/expense/UserExpenses';
// import ExpenseDetails from './components/expense/GetExpenseDetails';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/createExpense" element={<CreateExpense />} />
//         <Route path="/createShare" element={<CreateShare />} />
//         <Route path="/createPersonal" element={<CreatePersonal />} />
//         <Route path="/userExpenses" element={<UserExpenses />} />
//         <Route path="/expenses/:expenseId" element={<ExpenseDetails />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
