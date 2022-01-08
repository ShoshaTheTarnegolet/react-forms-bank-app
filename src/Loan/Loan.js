import React, { useContext, useRef } from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import NextBtn from '../Button/NextBtn';
import ReturnBtn from '../Button/ReturnBtn';
import { Context } from '../context/context.js';

export default function Loan() {
  const appContext = useContext(Context);
  const { Handle } = Slider;
  const nodeRef = useRef(null);

  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip prefixCls="rc-slider-tooltip" overlay={`${value} שנים`} visible={dragging} placement="top" key={index}>
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  const wrapperStyle = { width: 400, margin: 50 };

  const marks = {
    4: {
      style: {
        color: 'red',
        fontSize: '26px',
      },
      label: <strong>4</strong>,
    },
    8: {
      style: {
        color: 'red',
        fontSize: '26px',
      },
      label: <strong>8</strong>,
    },
  };

  const nextPg = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      let nf = new Intl.NumberFormat('en-US');

      console.log(nf.format(e.target.value));
      appContext.setLoan(nf.format(e.target.value));
    }
  };

  return (
    <div className="container">
      <form>
        <div className="header">
          <h1>Sign in</h1>
        </div>
        <label>
          <input type="text" placeholder="100,000 - 1,000,000" value={appContext.loan} onChange={onChange} />
        </label>

        <div style={wrapperStyle}>
          <Slider min={4} max={8} marks={marks} defaultValue={4} tipFormatter={(value) => `${value}שנים`} handle={handle} step={0.1} />
        </div>

        <NextBtn next={nextPg} />
        <ReturnBtn />
      </form>
    </div>
  );
}
