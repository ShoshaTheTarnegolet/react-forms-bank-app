import React, { useState } from 'react';
import './App.css';
import Login from './Login/Login';
import Info from './Info/Info';
import Bank from './Bank/Bank';
import Loan from './Loan/Loan';
import { BrowserRouter as Router, Routes, Route, Navigate, Switch, Redirect  } from 'react-router-dom';
import { Context } from './context/context.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setID] = useState(JSON.parse(localStorage.getItem('id')));
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [last_name, setLName] = useState('');
  const [birth_date, setBDate] = useState('');
  const [phone, setPhone] = useState('');
  const [company_ID, setCompanyID] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [holding, setHolding] = useState('');
  const [bank, setBank] = useState([]);
  const [branch, setBranch] = useState();
  const [account, setAccount] = useState('');
  const [editing, setEditing] = useState(false);
 const [user, setUser] = useState({});
 const [person, setPerson] = useState([]);
 const [loan, setLoan] = useState('')
 const [inputValue, setInputValue] = useState({ name: "", last_name: "" });

  return (
    <Context.Provider value={{loggedIn, setLoggedIn, id, setID, password, setPassword, name, setName, email, setEmail, last_name, setLName, birth_date, setBDate, phone, setPhone, company_ID, setCompanyID, company_name, setCompanyName, holding, setHolding, bank, setBank, branch, setBranch, account, setAccount, user, setUser, loan, setLoan, person, setPerson, editing, setEditing, inputValue, setInputValue}}>
<Router>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/info" element={<Info/>}/>
  <Route path="/bank" element={<Bank/>}/>
  <Route path="/loan" element={<Loan/>}/>
</Routes>
</Router>
</Context.Provider>
  )
}

export default App;
