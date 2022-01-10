import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NextBtn from '../Button/NextBtn';
import { db } from '../firebase';
import { Context } from '../context/context.js';
import TextInput from '../Inputs/TextInput';
import './Login.css';

export default function Login() {
  /* navigate for moving to other page */
  const appContext = useContext(Context);
  let navigate = useNavigate();

  /* useEffect for clearing localStorage */
  useEffect(() => {
    localStorage.removeItem('id');
  }, []);

  /* button function */
  function nextPg(e) {
    e.preventDefault();
    /* localStorage get id value from input */
    localStorage.setItem('id', appContext.id);
    /* error message for empty id input */
    if (!appContext.id) {
      alert('נא להזין את התעודת הזהות ');
    }
    /* retrive data from firestore using id */
    db.collection('users')
      .doc(appContext.id)
      .get()
      .then((snapshot) => {
        /* if there's no user with this id */
        if (!snapshot.data()) {
          alert('משתמש לא קיים');
        }
        let data = snapshot.data();
        /* if id and password from firestore are same as entered, we move on */
        if (data.id === appContext.id && data.password === appContext.password) {
          navigate('/info');
        } else {
          console.dir('we got an error. why?', data.password, appContext.password);
        }
      });
  }

  return (
    <div className="container ">
      <form className="container card">
        <div className="header_login">
          <h1> כניסה</h1>
        </div>
        <div className="input-login">
          <TextInput id="id" type="number" name="id" value={appContext.id} placeholder="תעודת זהות" onChange={(e) => appContext.setID(e.target.value)} />

          <TextInput id="password" type="password" name="password" value={appContext.password} placeholder="סיסמה" onChange={(e) => appContext.setPassword(e.target.value)} />
        </div>
        <NextBtn className="login_btn" next={nextPg} />
      </form>
    </div>
  );
}
