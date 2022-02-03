import React from 'react';

export default function NextBtn({ next, className, buttonText }) {
  return (
    <button className={className} type="button" onClick={next}>
      המשך
      {/* also it's good to add here an icon */}
    </button>
  );
}
