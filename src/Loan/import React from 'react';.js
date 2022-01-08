import React from 'react';
import './Slider.css';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 50,
      fillX: '30px',
      thumbLeft: '-1px',
    };
  }

  handleOnChange = (e) => this.setState({ value: e.target.value });

  render() {
    return (
      <div>
        <input type="range" min={4} max={8} value={this.state.value} step="0.1" lassName="slider" onChange={this.handleOnChange} />
        <div className="value">{this.state.value}</div>
      </div>
    );
  }
}

/* 	handleSliderChange(event){
		var bigVal = 500
		var thumbSize = 50
		var trackSize = bigVal - thumbSize
		var percent = event.target.value/100;
		var location = percent * trackSize

		var updatePx =  location + "px";
		var fillUpdate =  (location + 50) + "px";
console.log(percent,location, trackSize)
		this.setState({
			value: event.target.value,
			thumbLeft: updatePx,
			fillX: fillUpdate
		});
	}


	render(){
    const { value, fillX, thumbLeft } = this.state

		return (
		  <div className="range">

        <div className="range__display">
          <p className="range__current-val">{value}</p>
        </div>

        <div className="range__container">
            <div className="range__overlay" id="fill" style={{ width: fillX }} >
            </div>
            <div className="range__track" id="track"></div>
            <div className="range__thumb" id="thumb" style={{ left: thumbLeft }}></div>
            <div className="range__value" id="value" style={{ left: thumbLeft }}>{value}</div>
              <input
              onChange={this.handleSliderChange.bind(this)}
              className="range__tag"
              type="range"
              min="4"
              max="8"
              value={value}
              step="0.1"  />

          </div>

            <div className="range__labels">
              <div className="range__label">4</div>
              <div className="range__label range__space range__space--2">8</div>
            </div>
      </div>
		)
	}
}
 */
