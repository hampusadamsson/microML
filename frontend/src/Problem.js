import React, { Component } from 'react';
import axios from 'axios';
import Config from "./Config";


class Problem extends Component {
  constructor(props){
  super(props);
  this.state = {
    result: "Response goes here...",
    json: {
      "pl": 2,
      "pw": 2,
      "sl": 2,
      "sw": 2,
    },
  };
  this.SubmitSolution = this.SubmitSolution.bind(this);
}

SubmitSolution(){
  console.log("SENDING DATA");
  console.log(this.state.json);
  axios.post(Config.url + "/predict", this.state.json)
  .then(res => {
    console.log(res.data);
    this.setState({
      result: res.data,
    });
  })
  .catch(error => {
    console.log(error.response)
  });
}

handleChange (e) {
  const inp = {...this.state.json}
  inp[e.target.id] = e.target.value;
  console.log(inp)
  this.setState({
    json: inp,
  })}


render() {
  return (
    <div>
      <h2>microML</h2>
      <div>
        Sepal length (<i>{this.state.json.sl}</i>)
        <br/>
        <input type="range" min="0" max="7"  onChange={(e) => {this.handleChange(e)}} class="slider" id="sl" />
        <br/>
        Sepal width ({this.state.json.sw})
        <br/>
        <input type="range" min="0" max="5"  onChange={(e) => {this.handleChange(e)}} class="slider" id="sw" />
        Petal length (<i>{this.state.json.pl}</i>)
        <br/>
        <input type="range" min="0" max="7"  onChange={(e) => {this.handleChange(e)}} class="slider" id="pl" />
        Petal width (<i>{this.state.json.pw}</i>)
        <br/>
        <input type="range" min="0" max="3"  onChange={(e) => {this.handleChange(e)}} class="slider" id="pw" />
        <br/>
        <button onClick={() => {this.SubmitSolution()}} >Predict</button>
      </div>
      <br/>
      <i>{this.state.result}</i>
    </div>
  );
  }
}

export default Problem;
