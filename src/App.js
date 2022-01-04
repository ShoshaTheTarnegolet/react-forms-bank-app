import './App.css';
import Login from './Login/Login';
import Info from './Info/Info';
import Bank from './Bank/Bank';
import Loan from './Loan/Loan';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';

function App() {
  return (
<Router>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/info" element={<Info/>}/>
  <Route path="/bank" element={<Bank/>}/>
  <Route path="/loan" element={<Loan/>}/>
</Routes>
</Router>
  )
}

export default App;
