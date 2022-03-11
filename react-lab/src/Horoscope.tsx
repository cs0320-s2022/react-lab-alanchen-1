import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const axios = require('axios')

function TextBox(props : any) {
    const changeHandler = (event : any) => props.change(event.target.value)
    return (
        <div>
            <label>{props.label}: </label>
            <input type={'text'} name = "in" onChange={changeHandler}></input>
        </div>
    );
}

function Result(props : any) {
    return(
        <div>
            {props.val}<br></br>
        </div>
    );
}
function Results(props: any) {
    return(
        <div>
                {props.results.map((trait : String) => (<Result val={trait} />))}
        </div>
    );
}

function Horoscope() {
  const [sun, setSun] = useState("")
  const [moon, setMoon] = useState("")
  const [rising, setRising] = useState("")
  const [horoscope, setHoroscope] = useState([]);
    const requestHoroscope = () => {
    const toSend = {
        //TODO: Pass in the values for the data. Follow the format the route expects!
        "sun" : sun,
        "moon" : moon,
        "rising" : rising
    };

    let config = {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        }
    }

    //Install and import axios!
    //TODO: Fill in 1) location for request 2) your data 3) configuration
    axios.post('http://localhost:4567/horoscope', toSend, config)
    .then((response : any) => {
        console.log(response.data);
        //TODO: Go to the Main.java in the server from the stencil, and find what field name you should put here.
        //Note: It is very important that you understand how this is set up and why it works!
        setHoroscope(response.data["horoscope"]);
    })
    .catch((error:any) => {
        console.log(error);
    });
    }
  return (
    <div>
        <TextBox label={"Sun Sign"} change={setSun}/>
        <TextBox label={"Moon Sign"} change = {setMoon}/>
        <TextBox label={"Rising Sign"} change = {setRising}/>
        <AwesomeButton type="primary" onPress = {requestHoroscope}>Submit</AwesomeButton>
        <h1>Results</h1>
        <Results results={horoscope}/>
    </div>
  );
}

export default Horoscope;
