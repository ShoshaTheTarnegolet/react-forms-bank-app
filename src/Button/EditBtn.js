import React, { useContext, useState } from 'react';
import { Context } from '../context/context.js';
import { db } from '../firebase';

export default function EditBtn({ insidetext }) {
  const appContext = useContext(Context);

  const onClick = (e) => {
    e.preventDefault();
    if (!appContext.editing) {
      appContext.setEditing(true);
      appContext.setClick(true);
      console.log(appContext.isClick, appContext.editing);
    } else {
      if (!appContext.inputValue.name || !appContext.inputValue.last_name || !appContext.inputValue.email || !appContext.inputValue.birth_date || !appContext.inputValue.company_id || !appContext.inputValue.company_name || !appContext.id) {
        alert('נא למלא את הנתונים הנדרשים');
      } else {
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
        appContext.setEditing(false);
        appContext.setClick(false);
        console.log(appContext.isClick, appContext.editing);
      }
    }
  };

  return (
    <button className="edit_btn" type="button" onClick={onClick}>
      {insidetext}
    </button>
  );
}
