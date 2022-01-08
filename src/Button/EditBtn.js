import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/context.js';

export default function EditBtn() {
  const appContext = useContext(Context);


const onClick = () => {
    if (!appContext.editing) {
        appContext.setEditing(true);
    } else {
        appContext.setEditing(false);
    }
}

  return (
    <button className="PrevBtn" type="button" onClick={onClick}>
     edit
    </button>
  );
}
