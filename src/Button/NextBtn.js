import React from 'react';

export default function NextBtn({ next }) {
  return (
    <button className="nextBtn" type="button" onClick={next}>
      המשך
    </button>
  );
}
