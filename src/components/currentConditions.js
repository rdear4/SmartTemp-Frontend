import React, { useState, useEffect, useContext } from 'react'

import { UserContext } from '../context/UserProvider'

import './currentConditions.css'

const CurrentConditions = () => {

    const { getCurrentConditions } = useContext(UserContext)

    const [ temperature, setTemperature ] = useState(0)
    const [ humidity, sethumidity ] = useState(0)
    const [ shouldRefreshCurrent, setShouldRefreshCurrent ] = useState(false)

    const [ error, setError ] = useState("")

    useEffect(() => {

    // console.log("Timeout")
    window.setTimeout(() => {

        setShouldRefreshCurrent(!shouldRefreshCurrent)

    }, 5000)

    }, [setShouldRefreshCurrent, shouldRefreshCurrent])

    useEffect(() => {

    
    getCurrentConditions()
    .then(res => {
        // console.log(res.data)
        
        if (res.data.length > 0) {
            let avg = res.data[0].temperature
            
            for (let sensor of res.data) {
                avg += ((sensor.temperature * (9/5)) + 32)
                avg /= 2
            }
            
            setTemperature(res.data[0].temperature)
            sethumidity(res.data[0].humidity)

        } else {

            setTemperature(0)
            sethumidity(0)

            setError("No sensors are responding with current data")
        }
        

        
    })
    .catch(err => console.log(err))

    }, [shouldRefreshCurrent, getCurrentConditions])


    return (
        <div className="section-wrapper col align-center current-conditions-wrapper">
            <div className="section-header">
                <div className="section-title-wrapper">Sensors</div>
            </div>
            <div className="section-content">
                <div className="card-container flex-end">
                    <div className="card-wrapper">
                        <div className="card-title-wrapper">
                            <div className="card-title">Temperature</div>
                        </div>
                        <div className="card-data-wrapper">
                            <div className="card-data">{((temperature * 9.0/5.0) + 32).toFixed(2)} °F</div>
                        </div>
                    </div>
                </div>

                <div className="card-container flex-start">
                    <div className="card-wrapper">
                        <div className="card-title-wrapper">
                            <div className="card-title">Humidity</div>
                        </div>
                        <div className="card-data-wrapper">
                            <div className="card-data">{humidity} %</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default CurrentConditions