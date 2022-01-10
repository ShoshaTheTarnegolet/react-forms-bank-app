import React, { useState } from 'react';
import './App.css';
import Login from './Login/Login';
import Info from './Info/Info';
import Bank from './Bank/Bank';
import Loan from './Loan/Loan';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Context } from './context/context.js';

function App() {
  const [isClick, setClick] = useState(false);
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [last_name, setLName] = useState('');
  const [birth_date, setBDate] = useState('');
  const [phone, setPhone] = useState('');
  const [company_id, setCompanyID] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [holding, setHolding] = useState('');
  const [bank, setBank] = useState([]);
  const [branch, setBranch] = useState();
  const [account, setAccount] = useState('');
  const [editing, setEditing] = useState(false);
  const [loan, setLoan] = useState('');
  const [inputValue, setInputValue] = useState({ name: '', last_name: '', email: '', birth_date: '', phone: '', company_name: '', company_id: '' });

  return (
    <Context.Provider
      value={{
        id,
        setID,
        password,
        setPassword,
        name,
        setName,
        email,
        setEmail,
        last_name,
        setLName,
        birth_date,
        setBDate,
        phone,
        setPhone,
        company_id,
        setCompanyID,
        company_name,
        setCompanyName,
        holding,
        setHolding,
        bank,
        setBank,
        branch,
        setBranch,
        account,
        setAccount,
        loan,
        setLoan,
        editing,
        setEditing,
        inputValue,
        setInputValue,
        isClick,
        setClick,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/info" element={<Info />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/loan" element={<Loan />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
