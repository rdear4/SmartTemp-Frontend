import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './context/UserProvider'

import Header from './components/header'
import CurrentConditions from "./components/currentConditions"

import './App.css';

function App() {

  const { getSensors } = useContext(UserContext)

  const [ sensors, setSensors ] = useState([])
  // const [ selectedSensorIndex, setSelectedSensorIndex ] = useState(-1)
  

  // useEffect(() => {

  //   if (selectedSensorIndex >= 0) {
  //     console.log("Getting readings for sensor")
  //   } else {
  //     console.log("No sensor selected")
  //   }

  // }, [selectedSensorIndex])

  useEffect(() => {
    // console.log("Getting all the sensors")

    getSensors()
    .then(res => {
      setSensors(res.data)  
    })
    .catch(err => {
        console.log("Error getting sensors from the server")
        console.log(err)
    })

    


  }, [getSensors])

  

  // console.log(sensors)
  return (
    <div className="App">

      <div className="App-inner-wrapper">

        <Header />

        <CurrentConditions />

      </div>

      
    </div>
  );
}

export default App;
