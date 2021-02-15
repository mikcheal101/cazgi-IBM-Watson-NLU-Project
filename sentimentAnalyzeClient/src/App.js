import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    innercomp: <textarea rows="4" cols="50" id="textinput" className="form-control w-50 offset-3" />,
    mode: "text",
    sentimentOutput: [],
    sentiment: true
  }

  renderTextArea = () => {
    document.getElementById("textinput").value = "";
    if (this.state.mode === "url") {
      this.setState({
        innercomp: <textarea rows="4" cols="50" id="textinput" className="form-control w-50 offset-3" />,
        mode: "text",
        sentimentOutput: [],
        sentiment: true
      })
    }
  }

  renderTextBox = () => {
    document.getElementById("textinput").value = "";
    if (this.state.mode === "text") {
      this.setState({
        innercomp: <textarea rows="1" cols="50" id="textinput" className="form-control w-50 offset-3" />,
        mode: "url",
        sentimentOutput: [],
        sentiment: true
      })
    }
  }

  sendForSentimentAnalysis = () => {
    this.setState({ sentiment: true });
    let ret = "";
    let url = ".";
    // let url = "http://localhost:8080";

    if (this.state.mode === "url") {
      url = url + "/url/sentiment?url=" + document.getElementById("textinput").value;
    } else {
      url = url + "/text/sentiment?text=" + document.getElementById("textinput").value;
    }
    ret = axios.get(url);
    ret.then((response) => {

      //Include code here to check the sentiment and fomrat the data accordingly

      this.setState({ sentimentOutput: response.data });
      let output = response.data;
      if (response.data === "positive") {
        output = <div style={{ color: "green", fontSize: 20 }}>{response.data}</div>
      } else if (response.data === "negative") {
        output = <div style={{ color: "red", fontSize: 20 }}>{response.data}</div>
      } else {
        output = <div style={{ color: "yellow", fontSize: 20 }}>{response.data}</div>
      }
      this.setState({ sentimentOutput: output });
    });
  }

  sendForEmotionAnalysis = () => {
    this.setState({ sentiment: false });
    let ret = "";
    let url = ".";
    // let url = "http://localhost:8080";
    if (this.state.mode === "url") {
      url = url + "/url/emotion?url=" + document.getElementById("textinput").value;
    } else {
      url = url + "/text/emotion/?text=" + document.getElementById("textinput").value;
    }
    ret = axios.get(url);

    ret.then((response) => {
      console.log('sendForEmotionAnalysis: ', response.data);
      this.setState({ sentimentOutput: <EmotionTable emotions={response.data} /> });
    });
  }


  render() {
    return (
      <div className="App">
        <div className="btn-group mt-4">
          <button className="btn btn-info" onClick={this.renderTextArea}>Text</button>
          <button className="btn btn-dark" onClick={this.renderTextBox}>URL</button>
        </div>
        <br /><br />
        {this.state.innercomp}
        <div className="w-50 offset-3">
          <div className="dropdown-divider"></div>
        </div>
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br />
        {this.state.sentimentOutput}
      </div>
    );
  }
}

export default App;
