import React, { Component } from 'react';
import axios from 'axios';
import Config from "./Config";


class Problem extends Component {
  constructor(props){
  super(props);
  this.state = {
    result: "Response goes here...",
    json: {
      "rooms": 0,
      "fee": 0,
      "living_space": 0,
      "floor": 0,
      "supplemental_area": 0,
      "land_area": 0,
      "longitude": 0,
      "latitude": 0,
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
  console.log(e);
  const inp = {...this.state.json}
  inp[e.target.id] = e.target.value;
  console.log(inp)
  this.setState({
    json: inp,
  })}

  changeType(e) {
    console.log(e);
    const inp = {...this.state.json}
    inp["typeSummary"] = e;
    console.log(inp)
    this.setState({
      json: inp,
    })}


render() {
  return (
    <div>
      <h2>microML</h2>
      <div>
        Rooms (<i>{this.state.json.rooms}</i>)
        <br/>
        <input type="range" min="1" max="20"  onChange={(e) => {this.handleChange(e)}} className="slider" id="rooms" />

        Fee ({this.state.json.fee})
        <br/>
        <input type="range" min="0" max="10000"  onChange={(e) => {this.handleChange(e)}} className="slider" id="fee" />

        Living space (<i>{this.state.json.living_space}</i>)
        <br/>
        <input type="range" min="0" max="600"  onChange={(e) => {this.handleChange(e)}} className="slider" id="living_space" />

        Supplemental area (<i>{this.state.json.supplemental_area}</i>)
        <br/>
        <input type="range" min="0" max="600" onChange={(e) => {this.handleChange(e)}} className="slider" id="supplemental_area" />

        Floor (<i>{this.state.json.floor}</i>)
        <br/>
        <input type="range" min="0" max="10" onChange={(e) => {this.handleChange(e)}} className="slider" id="floor" />

        Land area (<i>{this.state.json.land_area}</i>)
        <br/>
        <input type="text" max="1000000"  onChange={(e) => {this.handleChange(e)}} id="land_area" />

        <br/>
        Longitude (<i>{this.state.json.longitude}</i>)
        <br/>
        <input type="text" onChange={(e) => {this.handleChange(e)}} id="longitude" />

        <br/>
        Latitude (<i>{this.state.json.latitude}</i>)
        <br/>
        <input type="text" onChange={(e) => {this.handleChange(e)}} id="latitude" />



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
