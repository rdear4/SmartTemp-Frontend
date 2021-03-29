import React, { useContext } from 'react'

import { UserContext } from '../context/UserProvider.js'

import './sensorCard.css'

const SensorCard = (props) => {

    const { selectedSensor, updateSelectedSensor } = useContext(UserContext)

    return (

        <div className={(props.sensor._id === selectedSensor) ? "sensor-card-wrapper card-selected light-border" : "sensor-card-wrapper light-border"} onClick={ () => updateSelectedSensor(props.sensor._id) }>
            <div className="image-wrapper">
                <div className="card-image"></div>
            </div>
            <div className="name-wrapper">
                {props.sensor.name}
            </div>
        </div>
    )
}

export default SensorCard