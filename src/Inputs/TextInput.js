import React from 'react';

export default function TextInput({ onChange, id, type, name, value, placeholder, required }) {
  return (
    <>
      <label>
        <input type={type} required={required} id={id} name={name} value={value} placeholder={placeholder} onChange={onChange} />
      </label>
    </>
  );
}
