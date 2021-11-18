import React from 'react';
import {connect} from 'react-redux';

class Square extends React.Component {
  render() {
    let {index, boxColorSet, onClick} = this.props
    return (
      <button {...{onClick, className: boxColorSet[index] ? "green" : ""}} />
    );
  }
}

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxColorSet: new Array(7).fill(false),
      boxClickOrder: []
    };
  };

  unclickInOrder() {
    let {boxColorSet, boxClickOrder} = this.state;
    for (let i = boxClickOrder.length - 1; i > -1; i--) {
      setTimeout(() => {
        let index = boxClickOrder[i];
        boxColorSet[index] = !boxColorSet[index];
        this.setState({boxColorSet})
      }, 500 * (7 - i));
    };
    this.setState({boxClickOrder: []});
  };

  onClick(index) {
    let {boxColorSet, boxClickOrder} = this.state;
    boxColorSet[index] = !boxColorSet[index];
    boxClickOrder.push(index);
    this.setState({boxColorSet, boxClickOrder});

    if (boxClickOrder.length === 7) {
      this.unclickInOrder();
    };
  };

  render() {
    let {boxColorSet} = this.state;
    return (
      <div className="container">
        <Square {...{index: 0, boxColorSet, onClick: () => this.onClick(0)}} />
        <Square {...{index: 1, boxColorSet, onClick: () => this.onClick(1)}} />
        <Square {...{index: 2, boxColorSet, onClick: () => this.onClick(2)}} />
        <br />
        <Square {...{index: 3, boxColorSet, onClick: () => this.onClick(3)}} />
        <br />
        <Square {...{index: 4, boxColorSet, onClick: () => this.onClick(4)}} />
        <Square {...{index: 5, boxColorSet, onClick: () => this.onClick(5)}} />
        <Square {...{index: 6, boxColorSet, onClick: () => this.onClick(6)}} />
      </div>
    );
  }
};

const mapStateToProps = (({text}) => {
  return {text}
});

export default connect(mapStateToProps)(HelloWorld);
