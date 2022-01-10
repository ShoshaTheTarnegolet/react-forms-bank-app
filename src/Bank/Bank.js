import React, { useEffect, useContext, useState } from 'react';
import NextBtn from '../Button/NextBtn';
import ReturnBtn from '../Button/ReturnBtn';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/context.js';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import TextInput from '../Inputs/TextInput';
import './Bank.css';

export default function Bank() {
  let navigate = useNavigate();
  const appContext = useContext(Context);

  const [formValues, setFormValues] = useState([{ branch: '', account: '' }]);

  /* for select */
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

  /* we send our data from select and inputs to firestore and move to another page */
  function nextPg(e) {
    e.preventDefault();
    navigate('/loan');
    add();
    db.collection('users').doc(appContext.id).set(
      {
        holding: appContext.holding,
        bank: appContext.bank,
        branch: appContext.branch,
        account: appContext.account,
      },
      { merge: true }
    );
  }

  const bankHandler = (i, e) => {
    appContext.bank[i] = e.target.value;
    console.log(e.target.value);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    console.log(newFormValues);
    formValues.map((x) => console.log(x.branch));
  };

  /* for aading and deleting blocks */
  let addFormFields = () => {
    setFormValues([...formValues, { branch: '', account: '' }]);
    appContext.setHolding(null);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    appContext.bank.splice(i, 1);
    setFormValues(newFormValues);
  };

  /* submit  each form and add new information to firestore*/
  let handleSubmit = (event) => {
    event.preventDefault();
    add();
  };

  const add = async function () {
    try {
      /* we updated our docs or added new info*/
      const docRef = doc(db, 'users', String(appContext.id));
      for (let i = 0; i < formValues.length; i++) {
        updateDoc(
          docRef,
          {
            holding: appContext.holding,
            [i]: {
              bank: appContext.bank[i],
              [i]: formValues[i],
            },
          },
          { merge: true }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div id="selection" className="container card ">
        <form onSubmit={handleSubmit} className="contentBox">
          <div className="header">
            <h1>
              {appContext.company_name} אנא מלאו את הפרטים החשבונות <br />
              פ.ח. {appContext.company_id}
            </h1>
          </div>

          <select placeholder="Select Option" className="select" name="select" defaultValue="help" onChange={(e) => appContext.setHolding(e.target.value)}>
            <option>החזקה %</option>
            {options.map(function (n) {
              return (
                <option value={n.value} selected={appContext.holding === n.value}>
                  {n.value}
                </option>
              );
            })}
          </select>
          <div className="row">
            {formValues.map((element, index) => (
              <div className="bank-choose " key={index + 1}>
                <select name="select" onChange={(e) => bankHandler(index, e)}>
                  <option>בנק</option>
                  {banks.map(function (n) {
                    return (
                      <option value={n.value} selected={appContext.bank === n.value}>
                        {n.value}
                      </option>
                    );
                  })}
                </select>
                <div className="input-row input_button_block">
                  <div>
                    <TextInput required type="number" id={index} name="branch" className="input" value={element.branch || ''} onChange={(e) => handleChange(index, e)} placeholder="סניף" />

                    <TextInput required type="text" name="account" className="input" value={element.account || ''} onChange={(e) => handleChange(index, e)} placeholder="חשבון" />
                  </div>
                  <div className="button-section">
                    <button type="button" className="button remove" onClick={() => removeFormFields(index)}>
                      להסיר
                    </button>
                    <button className="button submit" type="submit">
                      להגיש
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="input-row button_block">
            <NextBtn next={nextPg} />
            <ReturnBtn onClick={() => navigate(-1)} />
            <button className="button add" type="button" onClick={() => addFormFields()}>
              להוסיף
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
