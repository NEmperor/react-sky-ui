import React, { Component } from 'react';

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

class Timer extends Component {
  timer = 0;

  interval = 1000;

  constructor(props) {
    super(props);
    this.state = {
      lastTime: 0,
    };
  }


  componentDidMount() {
    this.tick();
  }

  componentDidUpdate(prevProps) {
    // componentDidUpdate执行后再执行setState的callback
    const { timeSwitch,onPause } = this.props;
    if(timeSwitch && !prevProps.timeSwitch){
        clearTimeout(this.timer);
        this.tick();
    }
    if(!timeSwitch && prevProps.timeSwitch){
        clearTimeout(this.timer)
        if(onPause){
            onPause()
        }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  defaultFormat = time => {
    const hours = 60 * 60 * 1000;
    const minutes = 60 * 1000;

    const h = Math.floor(time / hours);
    const m = Math.floor((time - h * hours) / minutes);
    const s = Math.floor((time - h * hours - m * minutes) / 1000);
    return (
      <span>
        {fixedZero(h)}:{fixedZero(m)}:{fixedZero(s)}
      </span>
    );
  };

  tick = () => {
    const { timeSwitch } = this.props;
    let { lastTime } = this.state;

    this.timer = setTimeout(() => {
      if (timeSwitch) {
        lastTime += this.interval;
        this.setState(
          {
            lastTime,
          },
          () => {
            this.tick();
          }
        );
      } 
    }, this.interval);
  };

  render() {
    const { format = this.defaultFormat,timeSwitch, ...rest } = this.props;
    const { lastTime } = this.state;
    const result = format(lastTime);

    return <span {...rest}>{result}</span>;
  }
}

export default Timer;
