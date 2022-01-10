import React, { useContext, useEffect } from 'react';
import { Context } from '../context/context.js';
import TextInput from '../Inputs/TextInput';


export default function InputBlock({ onChange }) {
  const appContext = useContext(Context);



  return (
    <>

          <div className="input-row">
            <TextInput onChange={onChange} required="required" id="name" type="text" name="name" placeholder=" שם פרטי" value={appContext.inputValue.name} />
            <TextInput id="last_name" type="text" name="last_name" value={appContext.inputValue.last_name} placeholder="שם המשפחה" onChange={onChange} />
          </div>
          <div className="input-row">
            <TextInput onChange={onChange} required="required" id="birth_date" type="date" name="birth_date" placeholder=" תאריך לידה" value={appContext.inputValue.birth_date} />
            <TextInput onChange={onChange} required="required" id="id" type="number" name="id" placeholder="תעודת זהות" value={appContext.inputValue.id} />
          </div>
          <div className="input-row">
            <TextInput onChange={onChange} required="required" id="email" type="email" name="email" placeholder="דואר אלקטרוני" value={appContext.inputValue.email} />
            <TextInput onChange={onChange} id="phone" type="phone" name="phone" placeholder="טלפון" value={appContext.inputValue.phone} />
          </div>
          <div className="input-row">
            <TextInput onChange={onChange} required="required" id="company_name" type="text" name="company_name" placeholder=" שם העסק" value={appContext.inputValue.company_name} />
            <TextInput onChange={onChange} required="required" id="company_id" type="number" name="company_id" placeholder=" ח.פ/שותפות/עמותה" value={appContext.inputValue.company_id} />
          </div>
    </>
  );
}
