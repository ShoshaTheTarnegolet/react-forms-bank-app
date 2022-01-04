import React from 'react';
import './Info.css';

export default function Info() {
  return (
    <div className="container">
      <h1>אנא השלימו את הפרטים הבאים</h1>

      <div className="form">
        <form>
          <div>
            <input type="text" className="input" placeholder="שם פרטי" />
            <input type="text" className="input" placeholder="שם המשפחה" />
          </div>
          <div>
            <input type="number" className="input" placeholder="תעודת זהות" />
            <input type="date" className="input" placeholder="תאריך לידה" />
          </div>
          <div>
            <input type="number" className="input" placeholder="טלפון" />
            <input type="email" className="input" placeholder="דואר אלקטרוני" />
          </div>
          <div>
            <input type="text" className="input" placeholder="שם העסק" />
            <input type="number" className="input" placeholder="ח.פ." />
          </div>
        </form>
      </div>
    </div>
  );
}
