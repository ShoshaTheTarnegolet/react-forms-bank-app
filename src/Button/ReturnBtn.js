import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../context/context.js';

export default function ReturnBtn({onClick}) {
    const navigate = useNavigate();
    const appContext = useContext(Context);



  return (
    <button className="PrevBtn" type="button" onClick={onClick}>
      חזור
    </button>
  );
}
