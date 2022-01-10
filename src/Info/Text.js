import React from 'react';


export default function Text({title, info}) {

  return (

<>

<div className="content animate slide '">
        <h3>{title}</h3>

        <p>{info}</p>
      </div>

</>

  );
}
