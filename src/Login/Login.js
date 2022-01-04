import React from 'react';
/* import './Login.css' */

export default function Login() {
  return (
    <div className="container">
    <form>
      <div className="segment">
        <h1>Sign in</h1>
      </div>
      <label>
        <input type="number" placeholder="ID" />
      </label>
      <label>
        <input type="password" placeholder="Password" />
      </label>
      <button className="loginBtn" type="button">
        Log in
      </button>
    </form>
    </div>
  );
}
