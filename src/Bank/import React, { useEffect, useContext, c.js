import React, { useEffect, useContext, createElement, useState } from 'react';
import Select from 'react-select';
import NextBtn from '../Button/NextBtn';
import ReturnBtn from '../Button/ReturnBtn';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/context.js';
import { db } from '../firebase';
import { onSnapshot, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export default function Bank() {
  let navigate = useNavigate();
  const appContext = useContext(Context);
  const [noOfRows, setNoOfRows] = useState(1);
  /*   const [bank_details, setBankDetails] = useState({
    holding: '',
    bank: '',
    branch: '',
    account: '',
  }); */
  const [bank_details, setBankDetails] = useState([]);

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
    /*   db.collection('users').doc(appContext.id).set(
      {
       holding:appContext.holding,
       bank: appContext.bank,
       branch: appContext.branch,
       account: appContext.account
      },
      { merge: true }
    ); */
  }

  const holdingHandler = (e) => {
    appContext.setHolding(e.value);
    console.log(appContext.holding);
  };

  const bankHandler = (e) => {
    appContext.setBank(e.value);
    console.log(appContext.bank);
  };
  const addRow = (e) => {
    e.preventDefault();
    setNoOfRows(noOfRows + 1);
    add();
    appContext.setBankDetails(appContext.bank_details.push(appContext.bank));
    console.log(appContext.bank_details);
  };

  const add = async function () {
    try {
      console.log(appContext.id, appContext.bank);
      const docRef = doc(db, 'users', String(appContext.id), `${new Date().toLocaleString()}`);
      setDoc(
        docRef,
        {
          holding: appContext.holding,
          bank: appContext.bank,
          branch: appContext.branch,
          account: appContext.account,
        },
        { merge: true }
      );
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
        <form>
          {[...Array(noOfRows)].map((elementInArray, index) => {
            return (
              <>
                <div className="row" key={index + 1}>
                  <p>% החזקה</p>
                  <Select placeholder="Select Option" options={options} className="select_holding" value={options.filter((obj) => obj.value === appContext.holding)} onChange={holdingHandler} />
                </div>
                <div className="row">
                  <p>בנק</p>
                  <Select placeholder="Select Option" options={banks} className="select_bank" value={banks.filter((obj) => obj.value === appContext.bank)} onChange={bankHandler} />

                  <p>סניף</p>
                  <input type="number" className="input" value={appContext.branch} onChange={(e) => appContext.setBranch(e.target.value)} />

                  <p>חשבון</p>
                  <input type="text" className="input" value={appContext.account} onChange={(e) => appContext.setAccount(e.target.value)} />
                </div>
              </>
            );
          })}

          <button type="button" onClick={addRow}>
            Add
          </button>
          <button type="button" onClick={() => setNoOfRows(noOfRows - 1)}>
            Delete
          </button>
        </form>
      </div>
      <div className="buttons">
        <NextBtn next={nextPg} />
        <ReturnBtn />
      </div>
    </div>
  );
}
