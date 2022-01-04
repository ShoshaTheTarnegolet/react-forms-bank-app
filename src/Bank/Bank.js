import React from 'react';
import Select from 'react-select';

export default function Bank() {
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

  return (
    <div className="container">
      <div className="form">
        <div className="header">
          <h1>אנא מלאו את הפרטים החשבונות</h1>
          <p>ח.פ.</p>
        </div>
        <form>
          <div className="row">
            <p>% החזקה</p>
            <Select defaultValue={options[0]} options={options} />
          </div>
          <div className="row">
            <p>בנק</p>
            <Select defaultValue={banks[0]} options={banks} />

            <p>סניף</p>
            <input type="number" className="input" />

            <p>חשבון</p>
            <input type="number" className="input" />
          </div>
        </form>
      </div>
    </div>
  );
}
