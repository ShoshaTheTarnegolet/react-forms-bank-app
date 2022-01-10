import React from 'react';

export default function ReturnBtn({ onClick }) {
  return (
    <button className="PrevBtn" type="button" onClick={onClick}>
      חזור
    </button>
  );
}
