import React, { useContext, useEffect } from 'react';
import './Info.css';
import NextBtn from '../Button/NextBtn';
import { db } from '../firebase';
import { Context } from '../context/context.js';
import { useNavigate } from 'react-router-dom';
import ReturnBtn from '../Button/ReturnBtn';
import EditBtn from '../Button/EditBtn';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import TextInput from '../Inputs/TextInput';

export default function Info() {
  const appContext = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    /*     appContext.setID(JSON.parse(localStorage.getItem('id')));
  console.log(appContext.id); */
    console.log(appContext.user.password);
    show();
  }, []);

  const show = async function () {
    try {
      db.collection('users')
        .where('id', '==', String(appContext.id))
        .onSnapshot((snapshot) => {
          let user_info = [];
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            console.log(data);
            appContext.setLName(data.last_name);
            /*  //  /*       appContext.setUser(appContext.user = data);
     /*       appContext.setPhone(data.phone); */
            user_info.push({
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
          appContext.setUser(user_info);
          /*          appContext.user.map(x => console.log(x)) */
          console.log(appContext.last_name);
          /*   appContext.setUser(user_info); */
          //  Object.keys(appContext.user).map((user) =>   console.log( user))
          //    console.dir(appContext.user);
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

  const onClick = () => {
    navigate(-1);
    /*  appContext.setID('');
    appContext.setUser('');
    appContext.setPassword('') */
  };

  const onChange = (e) => {
    appContext.setLName(e.target.value);

    appContext.user.user_last_name = e.target.value;
    console.log(appContext.last_name, appContext.user.user_last_name);
  };

  return (
    <div className="container">
      <div className="form">
        <div className="header">
          <h1>אנא השלימו את הפרטים הבאים</h1>
        </div>
        <form>
          <div>
            {/*
       {  appContext.user.map((user) =>
 ( <>
     {appContext.editing ? <TextInput onChange = {onChange}/> : <div>{appContext.last_name}</div>}
 </>

 ))} * */}
            {appContext.editing ? <TextInput onChange={onChange} /> : <div>{appContext.last_name}</div>}
            <input type="text" className="input" placeholder="שם פרטי" value={appContext.name} onChange={(e) => appContext.setName(e.target.value)} />
            <input type="text" className="input" placeholder="שם המשפחה" value={appContext.last_name} onChange={(e) => appContext.setLName(e.target.value)} />
          </div>
          <div>
            <input type="number" className="input" placeholder="תעודת זהות" pattern="[0-9]*" defaultValue={appContext.id} />
            <input type="date" className="input" placeholder="תאריך לידה" value={appContext.birth_date} onChange={(e) => appContext.setBDate(e.target.value)} />
          </div>
          <div>
            {appContext.editing ? <input type="number" className="input" placeholder="טלפון" value={appContext.phone} onChange={(e) => appContext.setPhone(e.target.value)} /> : <div>{appContext.user.phone}</div>}
            {/*     <input type="number" className="input" placeholder="טלפון" value={appContext.phone} onChange={(e) => appContext.setPhone(e.target.value)}/> */}
            <input type="email" className="input" placeholder="דואר אלקטרוני" value={appContext.user.email ? appContext.user.email : appContext.email} onChange={(e) => appContext.setEmail(e.target.value)} />
          </div>
          <div>
            <input type="text" className="input" placeholder="שם העסק" value={appContext.company_name} onChange={(e) => appContext.setCompanyName(e.target.value)} />
            <input type="number" className="input" placeholder="ח.פ." value={appContext.company_ID} onChange={(e) => appContext.setCompanyID(e.target.value)} />
          </div>
          <NextBtn next={nextPg} />
          <ReturnBtn onClick={onClick} />
          <EditBtn />
        </form>
      </div>
    </div>
  );
}
