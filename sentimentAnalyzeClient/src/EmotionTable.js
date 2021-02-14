import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {

  state = {
    items: []
  };

  constructor(props) {
    super(props);
    console.log("loaded");
  }

  componentDidMount() {
    // console.log(this.props.emotions.map(item => item));
    // console.log(this.state);
    for (var item in this.props.emotions)
      this.state.items.push(<tr><td>{item}</td><td>{this.props.emotions[item]}</td></tr>);
    console.log(this.state.items);
  }

  render() {
    return (
      <div>
        {/*You can remove this line and the line below. */}
        {/* {JSON.stringify(this.props.emotions)} */}
        <table className="table table-bordered">
          <tbody>
            {(this.state.items.map(row => row))}
          </tbody>
        </table>
      </div>
    );
  }

}
export default EmotionTable;
