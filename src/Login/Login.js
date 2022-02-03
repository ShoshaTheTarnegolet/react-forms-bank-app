import React, { useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NextBtn from '../Button/NextBtn';
import { db } from '../firebase';
import { Context } from '../context/context.js';
import TextInput from '../Inputs/TextInput';
import './Login.css';
import Modal from '../Modal/Modal'


const languages = {
  true: {
    lang: 'Eng',
    text1:' נא להזין את התעודת הזהות ',
    text2: 'משתמש לא קיים',
    header: 'כניסה',
    password:'סיסמה',
    id: 'תעודת זהות',
    closeButton: 'לסגור',
    nextButton: 'המשך'
  },
  false: {
    lang: 'עברית',
    text1:' Please enter the ID',
    text2: 'User does not exist',
    header: 'Log in',
    password:'password',
    id: 'id',
    closeButton: 'close',
    nextButton: 'next page'
  }
}

export default function Login() {
  /* navigate for moving to other page */
  const appContext = useContext(Context);
  let navigate = useNavigate();
  const [showResults, setShowResults] = React.useState(false)
  const [modalText, setModalText] = React.useState({
    text1: ' נא להזין את התעודת הזהות ',
    text2: 'משתמש לא קיים'
  })

  /* button function */
  function nextPg(e) {
    e.preventDefault();
    /* localStorage get id value from input
  localStorage.setItem('id', appContext.id);*/
    /* error message for empty id input */
    if (!appContext.id) {
      setShowResults(true)
    }
    /* retrive data from firestore using id */
    db.collection('users')
      .doc(appContext.id)
      .get()
      .then((snapshot) => {
        /* if there's no user with this id */
        if (!snapshot.data()) {
          setShowResults(true)
        }
        let data = snapshot.data();
        /* if id and password from firestore are same as entered, we move on */
        if (data.id === appContext.id && data.password === appContext.password) {
          navigate('/info');
        } else {
          console.log('we got an error. why?', data.password, appContext.password);
        }
      });
  }

  const divStyle = {
    display: showResults ? 'block' : 'none',
  };

const changeLanguage = (e) => {
  e.preventDefault();
appContext.language ? appContext.setLanguage(false) : appContext.setLanguage(true)

  console.log(appContext.language)
}

  return (
    <div className="container ">

      <form className="container card">
        <div className="header_login">
          <h1> {languages[appContext.language].header}</h1>
        </div>
        <div className="input-login">
          <TextInput id="id"  name="id" value={appContext.id} placeholder={languages[appContext.language].id} onChange={(e) => appContext.setID(e.target.value)} />

          <TextInput id="password" type="password" name="password" value={appContext.password} placeholder={languages[appContext.language].password} onChange={(e) => appContext.setPassword(e.target.value)} />
        </div>
        <button type="button" className="login_btn" onClick={nextPg} > {languages[appContext.language].nextButton}</button>
        <div className="input-row button_block">
        <button onClick={changeLanguage}>{languages[appContext.language].lang}</button>
        </div>
      </form>
     <Modal buttonText={languages[appContext.language].closeButton} className = {!showResults ? 'modal off' : 'modal '}  style={divStyle} onClick= {() => setShowResults(false)}
     text = {!appContext.id ? languages[appContext.language].text1 : languages[appContext.language].text2} />
    </div>
  );
}
