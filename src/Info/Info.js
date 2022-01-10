import React, { useContext, useEffect } from 'react';
import './Info.css';
import NextBtn from '../Button/NextBtn';
import { db } from '../firebase';
import { Context } from '../context/context.js';
import { useNavigate } from 'react-router-dom';
import ReturnBtn from '../Button/ReturnBtn';
import EditBtn from '../Button/EditBtn';
import TextBlock from './TextBlock';
import InputBlock from '../Inputs/InputBlock';

export default function Info() {
  const appContext = useContext(Context);
  let navigate = useNavigate();

  /* show function every time when rendering */
  useEffect(() => {
    show();
  }, []);

  const show = async function () {
    try {
      /* we have an id and we get the data from firestore */
      db.collection('users')
        .where('id', '==', String(appContext.id))
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            appContext.setLName(data.last_name);
            appContext.setName(data.name);
            appContext.setPhone(data.phone);
            appContext.setBDate(data.birth_date);
            appContext.setEmail(data.email);
            appContext.setCompanyID(data.company_id);
            appContext.setCompanyName(data.company_name);
            appContext.setInputValue((appContext.inputValue = data));
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  const nextPg = (e) => {
    e.preventDefault();

    if (!appContext.inputValue.name || !appContext.inputValue.last_name || !appContext.inputValue.email || !appContext.inputValue.birth_date || !appContext.inputValue.company_id || !appContext.inputValue.company_name || !appContext.id) {
      alert('נא למלא את הנתונים הנדרשים');
    } else {
      /* if all needed input are filled, we can move on */
      navigate('/bank');
      /* this two state helps us to toggle buttons and change text block to input block */
      appContext.setClick(false);
      appContext.setEditing(false);
      /* this is how we send our data to firestore. we update or added new fields */
      db.collection('users').doc(appContext.id).set(
        {
          name: appContext.inputValue.name,
          last_name: appContext.inputValue.last_name,
          email: appContext.inputValue.email,
          birth_date: appContext.inputValue.birth_date,
          phone: appContext.inputValue.phone,
          company_id: appContext.inputValue.company_id,
          company_name: appContext.inputValue.company_name,
        },
        { merge: true }
      );
    }
  };

  /* button to move to previous page */
  const onClick = () => {
    navigate(-1);
    appContext.setEditing(false);
    appContext.setID('');
    appContext.setPassword('');
  };

  /* we can put our valuer from input to an object */
  const handleChange = (e) => {
    const { name, value } = e.target;
    appContext.setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  /* for phonevalidation input */
  const phoneValidation = () => {
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    appContext.setValid(regex.test(appContext.inputValue.phone));
    console.log(appContext.isPhoneValid, regex.test(appContext.inputValue.phone));
    return !(!appContext.inputValue.phone || regex.test(appContext.inputValue.phone) === false);
  };
  /*  */

  return (
    <div className="container">
      <div className="container card">
        <div className="header">
          <h1>אנא השלימו את הפרטים הבאים</h1>
        </div>
        {appContext.editing ? (
          <InputBlock onChange={handleChange} />
        ) : (
          <>
            <TextBlock />
          </>
        )}

        <div className="input-row button_block">
          <NextBtn className="next_btn" next={nextPg} />
          <ReturnBtn className="return_btn" onClick={onClick} />
          <EditBtn insidetext={appContext.isClick ? 'לשמור' : 'לערוך'} />
        </div>
      </div>
    </div>
  );
}
