import React from 'react';
import './Modal.css'

export default function Modal({onClick, style, className, text, buttonText}) {


    return(
        <div  style={style} className={className}>
         <div className="modal-content animate slide">
      <div className="modal-text">{text} </div>
      <button className = 'close' onClick = {onClick}>{buttonText}</button>
         </div>
        </div>
    )
}
