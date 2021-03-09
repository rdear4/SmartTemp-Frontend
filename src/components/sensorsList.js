import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from '../context/UserProvider'

import SensorCard from './sensorCard'

import './sensorsList.css'

const SensorsList = (props) => {

    const { getSensors } = useContext(UserContext)

    const [ sensors, setSensors ] = useState([])

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

    return (

        <div className="section-wrapper col align-center sensors-list-wrapper">

            <div className="section-header">
                <div className="section-title-wrapper">Sensors</div>
            </div>
            <div className="section-content sensors-wrapper">
                {sensors.map((sensor, i) => {

                    return <SensorCard key={i} sensor={sensor} sensorIndex={i} />

                })}
            </div>
            
        </div>
    )
}

export default SensorsList