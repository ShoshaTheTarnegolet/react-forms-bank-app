import React, { useEffect, useContext, createElement, useState } from 'react';
import Select from 'react-select';
import NextBtn from '../Button/NextBtn';
import ReturnBtn from '../Button/ReturnBtn';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/context.js';
import { db } from '../firebase';
import { onSnapshot, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function Bank() {
  let navigate = useNavigate();
  const appContext = useContext(Context);

  const [formValues, setFormValues] = useState([{ branch: '', account: ''}]);

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
/*     console.log(e);
    let newFormValues = [...appContext.bank];
    newFormValues = e.value; */

    appContext.bank[i] = e.value;
    console.log(  appContext.bank);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    console.log(newFormValues);
    formValues.map((x) => console.log(x.branch));
  };

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
        console.log(formValues[i]);
        updateDoc(
          docRef,
          {
            holding: appContext.holding,
            [i]:{
              bank: appContext.bank[i],
              [i]: formValues[i]
            }

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
