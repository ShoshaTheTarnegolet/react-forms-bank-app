import React, { useEffect, useContext, createElement, useState } from 'react';
import Select from 'react-select';
import NextBtn from '../Button/NextBtn';
import ReturnBtn from '../Button/ReturnBtn';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/context.js';
import { db } from '../firebase';
import { onSnapshot, collection, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';

export default function Bank() {
  let navigate = useNavigate();
  const appContext = useContext(Context);

  const [formValues, setFormValues] = useState([{ branch: '', account: '', bank: '' }]);

  const options = [
    { value: '5%', label: '5%' },
    { value: '15%', label: '15%' },
    { value: '25%', label: '25%' },
    { value: '50%', label: '50%' },
    { value: '80%', label: '80%' },
  ];
  const banks = [
    { value: 'poalim', label: 'Poalim' },
    { value: 'leumi', label: 'Leumi' },
    { value: 'discount', label: 'Discount' },
  ];

  useEffect(() => {
    console.log(appContext.id, localStorage);
  }, []);

  function nextPg(e) {
    e.preventDefault();
    navigate('/loan');
    /*  add();
   db.collection('users').doc(appContext.id).set(
      {
       holding:appContext.holding,
       bank: appContext.bank,
       branch: appContext.branch,
       account: appContext.account
      },
      { merge: true }
    ); */
  }

  //   const bankHandler = (i, e) => {
  // /*    appContext.setBank(e.value); */
  // /* let newFormValues = [...formValues];
  // newFormValues[i][e.target.name] = e.target.value;
  // setFormValues(newFormValues); */
  // console.log(e);
  //   }

  const bankHandler = (i, e) => {
    console.log(e);
    let newFormValues = [...appContext.bank];
    newFormValues[i][e.label] = e.value;
    /*   setFormValues(newFormValues) */
    /* appContext.bank.push({
    e: e.value
  }) */
    console.log(newFormValues);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    formValues.map((x) => console.log(x.branch));
  };

  let addFormFields = () => {
    setFormValues([...formValues, { branch: '', account: '', bank: '' }]);
    appContext.setHolding(null);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formValues));
    add();
  };

  const add = async function () {
    try {
      console.log(appContext.id, appContext.bank);
      const docRef = doc(db, 'users', String(appContext.id));
      for (let i = 0; i < formValues.length; i++) {
        console.log(formValues[i].branch);
        setDoc(
          docRef,
          {
            holding: appContext.holding,
            bank: appContext.bank,
            branch: {
              [i]: formValues[i].branch,
            },
            account: {
              [i]: formValues[i].account,
            },
          },
          { merge: true }
        );
      }
      /*      formValues.map((val,i) => {
        console.log(val.branch, i);
        return (setDoc(docRef,  {
          holding:appContext.holding,
          bank: appContext.bank,
          [i]: {
            branch: val.branch,
            account:val.account
          }
         },
         { merge: true } ))
      }) */

      /*        const doRef = await addDoc(collection(db, 'users',String(appContext.id), 'bank_info'), {
        holding:appContext.holding,
        bank: appContext.bank,
        branch: appContext.branch,
        account: appContext.account
      }); */

      /*       const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      const data = docSnap.data(); */
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <div className="header">
          <h1>אנא מלאו את הפרטים החשבונות</h1>
          <p>ח.פ.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>% החזקה</label>
          <Select placeholder="Select Option" options={options} className="select_holding" value={options.filter((obj) => obj.value === appContext.holding)} onChange={(e) => appContext.setHolding(e.value)} />

          {formValues.map((element, index) => (
            <div className="form-inline" key={index + 1}>
              <Select placeholder="Select Option" name="bank" options={banks} className="select_bank" value={options.value} onChange={(e) => bankHandler(index, e)} />
              <label>סניף</label>
              <input type="number" id={index} name="branch" className="input" value={element.branch || ''} onChange={(e) => handleChange(index, e)} />
              <label>חשבון</label>
              <input type="text" name="account" className="input" value={element.account || ''} onChange={(e) => handleChange(index, e)} />
              <button type="button" className="button remove" onClick={() => removeFormFields(index)}>
                Remove
              </button>
              {/*      {
                index ?
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                : null
              } */}
            </div>
          ))}
          <div className="button-section">
            <button className="button add" type="button" onClick={() => addFormFields()}>
              Add
            </button>
            <button className="button submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="buttons">
        <NextBtn next={nextPg} />
        <ReturnBtn onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}

import React, { useContext, useEffect } from 'react';
import './Info.css';
import NextBtn from '../Button/NextBtn';
import { db } from '../firebase';
import { Context } from '../context/context.js';
import { useNavigate } from 'react-router-dom';
import ReturnBtn from '../Button/ReturnBtn';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';

export default function Info() {
  const appContext = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    /*     appContext.setID(JSON.parse(localStorage.getItem('id')));
  console.log(appContext.id); */
    console.log(appContext.id, localStorage);
    show();
    /*
    db.collection('users').where('id', '==', String(appContext.id))
    .onSnapshot((snapshot) => {
       snapshot.docs.forEach(doc => {
        console.log("Document data:", doc.data().email);
     if (doc.data().email.exists) {
          console.log("Document data:", doc.data());
        }
       });

       }); */
  }, []);

  const show = async function () {
    try {
      // console.log(appContext.id);
      // const docRef = doc(db, 'users', String(appContext.id));
      // const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
      // const data = docSnap.data();

      // let user_info = [];
      // user_info.push({
      //   user_name: data.name,
      //   user_last_name: data.last_name,
      //   user_email: data.email,
      //   user_birth_date: data.birth_date,
      //   user_phone: data.phone,
      //   user_company_id: data.company_id,
      //   user_company_name: data.company_name,
      //   user_ID: data.id,
      //  })

      //  appContext.setUser(appContext.user = user_info);
      //  console.log(appContext.user);
      //  return {user_info}
      /*      if (appContext.id = '') {
        appContext.setUser()
      } */
      db.collection('users')
        .where('id', '==', String(appContext.id))
        .onSnapshot((snapshot) => {
          let user_info = [];
          snapshot.docs.forEach((doc) => {
            console.log(doc.data());
            const data = doc.data();
            /*  appContext.setUser(appContext.user = data); */
            appContext.user.push({
              user_name: data.name,
              user_last_name: data.last_name,
              user_email: data.email,
              user_birth_date: data.birth_date,
              user_phone: data.phone,
              user_company_id: data.company_id,
              user_company_name: data.company_name,
              user_ID: data.id,
            });
          });
          console.log(user_info);
          /*   appContext.setUser(user_info); */
          console.log(appContext.user);
        });
    } catch (e) {
      console.log(e);
    }
  };

  /*  const show = () => {

    console.log( appContext.id);
      db.collection('users').where('id', '==', "123")
      .onSnapshot((snapshot) => {
        let user_info = []
         snapshot.docs.forEach(doc => {
           const data = doc.data();
           user_info.push({
            user_name: data.name,
            user_last_name: data.last_name,
            user_email: data.email,
            user_birth_date: data.birth_date,
            user_phone: data.phone,
            user_company_id: data.company_id,
            user_company_name: data.company_name,
            user_ID: data.id,
           })
           console.log( user_info);
           appContext.setUser(user_info);
           console.log(appContext.user);
         });
       })


  } */

  const nextPg = (e) => {
    e.preventDefault();
    navigate('/bank');
    db.collection('users').doc(appContext.id).set(
      {
        name: appContext.name,
        last_name: appContext.last_name,
        email: appContext.email,
        birth_date: appContext.birth_date,
        phone: appContext.phone,
        company_id: appContext.company_ID,
        company_name: appContext.company_name,
      },
      { merge: true }
    );
  };

  return (
    <div className="container">
      <div className="form">
        <div className="header">
          <h1>אנא השלימו את הפרטים הבאים</h1>
        </div>
        <form>
          <div>
            {/*   {appContext.user.map((user) => (
    <div>
                <input type="number" className="input" placeholder="טלפון" value={user.phone} onChange={(e) => appContext.setPhone(e.target.value)}/>
  <input type="text" className="input" placeholder="שם פרטי" value={user.name} onChange={(e) => appContext.setName(e.target.value)} />
    </div>
           ))} */}
            <input type="text" className="input" placeholder="שם פרטי" value={appContext.name} onChange={(e) => appContext.setName(e.target.value)} />
            <input type="text" className="input" placeholder="שם המשפחה" value={appContext.last_name} onChange={(e) => appContext.setLName(e.target.value)} />
          </div>
          {/*   {appContext.user.map((user) => (
               <input type="number" className="input" placeholder="תעודת זהות" pattern="[0-9]*" defaultValue={user.user_ID} />
))} */}
          <div>
            <input type="number" className="input" placeholder="תעודת זהות" pattern="[0-9]*" defaultValue={appContext.id} />
            <input type="date" className="input" placeholder="תאריך לידה" value={appContext.birth_date} onChange={(e) => appContext.setBDate(e.target.value)} />
          </div>
          <div>
            <input type="number" className="input" placeholder="טלפון" value={appContext.phone} onChange={(e) => appContext.setPhone(e.target.value)} />
            <input type="email" className="input" placeholder="דואר אלקטרוני" value={appContext.email} onChange={(e) => appContext.setEmail(e.target.value)} />
          </div>
          <div>
            <input type="text" className="input" placeholder="שם העסק" value={appContext.company_name} onChange={(e) => appContext.setCompanyName(e.target.value)} />
            <input type="number" className="input" placeholder="ח.פ." value={appContext.company_ID} onChange={(e) => appContext.setCompanyID(e.target.value)} />
          </div>
          <NextBtn next={nextPg} />
          <ReturnBtn />
        </form>
      </div>
    </div>
  );
}
