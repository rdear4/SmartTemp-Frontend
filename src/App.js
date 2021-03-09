import React, { useState, useContext } from 'react'
import { UserContext } from './context/UserProvider'

import Header from './components/header'
import CurrentConditions from "./components/currentConditions"
import SensorsList from './components/sensorsList'

import './App.css';

function App() {

  
  return (
    <div className="App">

      <div className="App-inner-wrapper">

        <Header />

        <CurrentConditions />

        <SensorsList />

      </div>

      
    </div>
  );
}

export default App;
