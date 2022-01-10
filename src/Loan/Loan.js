import React, { useContext } from 'react';
import 'rc-slider/assets/index.css';
import NextBtn from '../Button/NextBtn';
import ReturnBtn from '../Button/ReturnBtn';
import { Context } from '../context/context.js';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import TextInput from '../Inputs/TextInput';
import { useNavigate } from 'react-router-dom';
import './Loan.css';

export default function Loan() {
  const appContext = useContext(Context);
  let navigate = useNavigate();

  /* for slider */
  const marks = [
    {
      value: '4',
      label: '4',
    },
    {
      value: 8,
      label: '8',
    },
  ];


  const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,


    '& .MuiSlider-track': {
      border: 'none',

    },
    '&.css-1geiho5-MuiSlider-root .MuiSlider-track': {
      color: '#000',
    },
    '& .css-14pt78w-MuiSlider-rail': {
      color: '#000',
      backgroundColor: '#000',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#1976d2',
      border: '2px solid #1976d2',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 20,
      background: 'unset',
      padding: '8px 0',
      width: 40,
      height: 40,

      boxShadow: '7px 7px 15px rgba(55, 84, 170, .15), 6px 6px 20px rgb(0 0 0 / 10%)',
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#EBECF0',
      color: '#a3aab9',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

  return (
    <div className="container selection animate slide">
      <div className="container card ">
        <div className="header">
          <h1>אנא הזינו את סכום החלוואה המבוקש ומשך זמן הלוואה</h1>
        </div>

        <div className="input-row slider">
          <div id="slider_block">
            <TextInput
              id="range"
              type="number"
              name="range"
              min="10000"
              max="1000000"
              placeholder="100,000 - 1,000,000"
              value={appContext.loan}
              onChange={(e) => {
                appContext.setLoan(e.target.value);
              }}
            />

            <div id="slider">
              <PrettoSlider  step={0.1} valueLabelDisplay="auto" min={4} max={8} aria-label="pretto slider" defaultValue={4} marks={marks} />
            </div>
          </div>
          <div className="button-section">
            <NextBtn />
            <ReturnBtn onClick={() => navigate(-1)} />
          </div>
        </div>
      </div>
    </div>
  );
}
