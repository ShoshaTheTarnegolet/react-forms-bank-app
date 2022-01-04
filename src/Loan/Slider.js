import React from 'react';
import './Slider.css';

export default class Slider extends React.Component {
  state = {
    value: 4.5,
    bubble: 0,
  };

  setBubble = (range) => {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    this.setState({
      bubble: newVal,
    });
  };

  handleOnChange = (e) => {
    this.setBubble(e.target.value, this.state.bubble);
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div className="sliderBlock">
        <input type="range" min={4} max={8} step={0.5} value={this.state.value} className="slider" onChange={this.handleOnChange} />
        <div className="bubble"> {this.state.bubble}</div>
        <div className="value">{this.state.value}</div>
      </div>
    );
  }
}
