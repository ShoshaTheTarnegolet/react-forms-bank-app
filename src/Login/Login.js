import React, { useEffect, useContext, useLocalStorage } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NextBtn from '../Button/NextBtn';
import { db } from '../firebase';
import { Context } from '../context/context.js';
/* import './Login.css' */

export default function Login() {


  const appContext = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    console.log(appContext.id)
    localStorage.removeItem('id');
/*     console.log(localStorage); */
/*     localStorage.removeItem('id'); */
  }, []);

  function nextPg(e) {
    e.preventDefault();
 localStorage.setItem('id', appContext.id);
    console.log(localStorage);
    db.collection('users')
      .doc(appContext.id)
      .get()
      .then((snapshot) => {
        let data = snapshot.data();
        console.log(data);
        if (data.id === appContext.id && data.password === appContext.password) {
          console.log(appContext.id);
          appContext.setLoggedIn(true);
          navigate('/info');
        } else {
          console.dir('no', data.password, appContext.password);
        }
      });
  }

  return (
    <div className="container">
      <form>
        <div className="header">
          <h1>Sign in</h1>
        </div>
        <label>
          <input type="number" placeholder="ID" value={appContext.id} onChange={(e) => appContext.setID(e.target.value)} />
        </label>
        <label>
          <input type="password" placeholder="Password" value={appContext.password} onChange={(e) => appContext.setPassword(e.target.value)} />
        </label>
        <NextBtn next={nextPg} />
      </form>
    </div>
  );
}
