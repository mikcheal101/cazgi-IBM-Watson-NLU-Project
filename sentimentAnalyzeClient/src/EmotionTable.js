import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {

  state = {
    items: []
  };

  componentDidMount() {
    for (var item in this.props.emotions)
      this.state.items.push(<tr><td>{item}</td><td>{this.props.emotions[item]}</td></tr>);
    this.setState(this.state);
  }

  render() {
    return (
      <div className="text-center">
        <table className="table table-bordered w-50 mt-4 offset-3">
          <tbody>
            {(this.state.items.map(row => row))}
          </tbody>
        </table>
      </div>
    );
  }

}
export default EmotionTable;
