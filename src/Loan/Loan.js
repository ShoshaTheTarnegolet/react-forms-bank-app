import React from 'react';
import Slider from './Slider'

export default function Loan() {

return(
    <div className="container">
    <form>
      <div className="header">
        <h1>Sign in</h1>
      </div>
      <label>
        <input type="number" placeholder="100,000 - 1,000,000" max='1,000,000' min='100,000' />
      </label>
    
      <Slider />

      <button className="loginBtn" type="button">
        Log in
      </button>
    </form>
    </div>
)
}
