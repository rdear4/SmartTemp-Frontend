import React, { useState, useContext } from 'react'
import { UserContext } from './context/UserProvider'

import Header from './components/header'
import CurrentConditions from "./components/currentConditions"
import SensorsList from './components/sensorsList'
import SensorData from './components/sensorData'

import './App.css';

function App() {

  
  return (
    <div className="App">

      <div className="App-inner-wrapper">

        <Header version="0.3.0"/>

        <CurrentConditions />

        <SensorsList />

        <SensorData />

      </div>

      
    </div>
  );
}

export default App;
