import React from 'react';
import randomWords from 'random-words';
import {connect} from 'react-redux';
import store from './ReduxStore';

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'white'
    };
  };

  changeColor({color}) {
    this.setState({color: color ? color : `#${Math.floor(Math.random() * 16777215).toString(16)}`});
  };

  changeText({phrase}) {
    store.dispatch({type: 'SET', path: 'text', value: phrase ? phrase : randomWords(2).join(' ')});
  }

  render() {
    let {text} = this.props;
    let {color} = this.state;
    return (
      <span>
        <div {...{style: {color}}} >{text}</div>
        <br />
        <button {...{onClick: () => this.changeColor({})}}>Change Color</button>
        <button {...{onClick: () => this.changeColor({color: 'white'})}}>Reset Color</button>
        <button {...{onClick: () => this.changeText({})}}>Change Text</button>
        <button {...{onClick: () => this.changeText({phrase: 'hello, world!'})}}>Reset Text</button>
      </span>
    );
  }
};

const mapStateToProps = (({text}) => {
  return {text}
});

export default connect(mapStateToProps)(HelloWorld);
