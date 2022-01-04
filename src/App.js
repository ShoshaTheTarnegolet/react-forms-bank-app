import './App.css';
import Login from './Login/Login';
import Info from './Info/Info';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';

function App() {
  return (
<Router>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/info" element={<Info/>}/>
</Routes>
</Router>
  )
}

export default App;
