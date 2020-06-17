import React, { Component } from 'react';
import axios from 'axios';
import Config from "./Config";


class Problem extends Component {
  constructor(props){
  super(props);
  this.state = {
    "loc": "",
    result: "",
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
  this.checkPlace = this.checkPlace.bind(this);
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
  })
}

checkPlace(loc){
  console.log("checkPlace");
  const opencage = require('opencage-api-client');
  opencage.geocode({ q: loc, key: process.env.REACT_APP_OCD_API_KEY})
    .then(data => {
      console.log(data);
      const inp = {...this.state.json}
      inp["latitude"] = data.results[0].geometry.lng; //lon-lat mixed up
      inp["longitude"] = data.results[0].geometry.lat; //lon-lat mixed up
      this.setState({
        json: inp,
        loc: data.results[0].formatted,
      })
    })
    .catch(error => {
      console.log('error', error.message);
    });
}

_handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    this.checkPlace(e.target.value);
  }
}

parseValue = (x) => {
  if(x!=""){
    return x.toString().replace(".","").replace(/\B(?=(\d{3})+(?!\d))/g, "'") + " kr";
  }else{
    return "";
  }
}

render() {
  return (
    <div>
      <h2>Fastighetsvärdering</h2>
      <div className="container">
        <div className="containerSmall">
          <b>Rum </b>
          <small>{this.state.json.rooms} st</small>
          <input className="dd" type="range" min="1" max="20"  onChange={(e) => {this.handleChange(e)}} id="rooms" />
        </div>

        <div className="containerSmall">
          <b>Avgift </b>
          <small>{this.state.json.fee}</small>
          <input className="dd" type="range" min="0" max="10000"  onChange={(e) => {this.handleChange(e)}} id="fee" />
          <br/>
        </div>

        <div className="containerSmall">
          <b>m&sup2; </b>
          <small>{this.state.json.living_space}</small>
          <input className="dd" type="range" min="0" max="600"  onChange={(e) => {this.handleChange(e)}} id="living_space" />
        </div>

        <div className="containerSmall">
          <b>Tilläggsområde </b>
          <small>{this.state.json.supplemental_area}</small>
          <input className="dd" type="range" min="0" max="600" onChange={(e) => {this.handleChange(e)}} id="supplemental_area" />
        </div>

        <div className="containerSmall">
          <b>Våning </b>
          <small>{this.state.json.floor}</small>
          <input className="dd" type="range" min="0" max="10" onChange={(e) => {this.handleChange(e)}} id="floor" />
        </div>

        <div className="containerSmall">
          <b>Mark </b>
          <small className="small">{this.state.json.land_area}</small>
          <input className="dd" type="range" max="1000"  onChange={(e) => {this.handleChange(e)}} id="land_area" />
        </div>

        <br/>
        <input type="text" onKeyDown={(e) => {this._handleKeyDown(e)}} id="location" placeholder="Ex. Stagneliusvägen 42"/>
        <br/>
        <i>{this.state.loc}</i>

        <br/>
        <button onClick={() => {this.SubmitSolution()}} >Predict</button>
      </div>
      <br/>
      <i className="value">{this.parseValue(this.state.result)}</i>
    </div>
  );
  }
}

export default Problem;
