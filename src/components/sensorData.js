import React, { useState, useContext, useEffect } from 'react'
import Plot from 'react-plotly.js'

import { UserContext } from '../context/UserProvider'

import './sensorData.css'

const SensorData = () => {

    const { getSensorInfo, selectedSensor, getRecentDataForSensor } = useContext(UserContext)

    const sensorInitialState = {
        name: "-",
        _id: "-",
        location: "-"
    }
    const [ sensor, setSensor ] = useState(sensorInitialState)

    const [ sensorData, setSensorData ] = useState([])

    const [ batteryData, setBatteryData ] = useState([])
    const [ tempData, setTempData ] = useState([])
    const [ humidityData, setHumidityData ] = useState([])
    const [ dates, setDates ] = useState([])
    const [ shouldRefreshData, setShouldRefreshData ] = useState(false)

    useEffect(() => {

        window.setTimeout(() => {
            setShouldRefreshData(!shouldRefreshData)
        }, 5000)

    }, [setShouldRefreshData, shouldRefreshData])

    let reduceArray = (arr, property, skipNumber) => {

        let newArray = arr.reduce((x, y, i) => {

            return (i % skipNumber === 0) ? [...x, y[property]] : x

        }, [])

        return newArray
    }

    let pad = (number) => {
        if (parseInt(number) < 10) {
            return `0${number}`
        }

        return number
    }

    useEffect(() => {

        if (selectedSensor !== -1) {
            getSensorInfo(selectedSensor)
            .then(res => {

                setSensor(res.data)

            })
            .catch(err => console.log(err))

            getRecentDataForSensor(selectedSensor)
            .then(res => {

                if (res.data.length !== 0) {

                    let batteryReadings = reduceArray(res.data, "batteryLevel", 1)

                    let humidityReadings = reduceArray(res.data, "humidity", 1)
                    let temperatureReadings = reduceArray(res.data, "temperature", 1)
                    temperatureReadings = temperatureReadings.map((x, i) => (x * 9/5) + 32)
                    let datesArray = reduceArray(res.data, "timestamp", 1)

                    let newDates = datesArray.map((d, i) => {

                        let nd = new Date(d)
                        return (`${pad(nd.getFullYear())}-${pad(nd.getMonth() + 1)}-${pad(nd.getDate())} ${nd.getHours()}:${pad(nd.getMinutes())}:${pad(nd.getSeconds())}`)

                    })


                    setBatteryData(batteryReadings)
                    setHumidityData(humidityReadings)
                    setTempData(temperatureReadings)
                    setDates(newDates)

                    let sorted = datesArray.reduce((x, y) => { 
                        if (x === false) { 
                            return false; 
                        } else { 
                            return (new Date(x) < new Date(y)) ? new Date(y) : false; 
                        }
                    })

                    setSensorData(res.data)

                    // console.log((sorted === false) ? "The dates are not in order" : "The dates are in ascending order")
                    
                } else {

                    setBatteryData([])
                    setHumidityData([])
                    setTempData([])
                    setDates([])
                    setSensorData([])
                    setSensor(sensorInitialState)

                }

                

                
                
            })
            .catch(err => console.log(err))

        } else {
            console.log("no sensor selected")
        }

    }, [selectedSensor, getSensorInfo, shouldRefreshData])
    
    let displayCharts = () => {
        
        return (<React.Fragment>


                <div className="chart-wrapper">
                    <Plot data={[
                        {
                            x: dates,
                            y: tempData,
                            type: 'scatter',
                            mode: 'lines',
                            marker: {color: 'red'},
                        }
                        ]}
                        layout={
                            {
                                yaxis: {
                                    autorange: true,
                                    type: 'linear'
                                },
                                width: 1650,
                                title: "Temperatures"
                            }
                        }
                        
                    />

                </div>
                <div className="chart-wrapper">
                    <Plot data={[
                        {
                            x: dates,
                            y: humidityData,
                            type: 'scatter',
                            mode: 'lines',
                            marker: {color: 'red'},
                        }
                        ]}
                        layout={
                            {
                                yaxis: {
                                    autorange: true,
                                    type: 'linear'
                                },
                                width: 1650,
                                title: "Humidity"
                            }
                        }
                        
                    />
                </div>
                <div className="chart-wrapper">
                    <Plot data={[
                        {
                            x: dates,
                            y: batteryData,
                            type: 'scatter',
                            mode: 'lines',
                            marker: {color: 'red'},
                        }
                        ]}
                        layout={
                            {
                                yaxis: {
                                    range: [3, 5],
                                    type: 'linear'
                                },
                                width: 1650,
                                title: "Battery Level"
                            }
                        }
                        
                    />
                </div>

        </React.Fragment>)
    }
    // console.log(`There are ${sensorData.length} entries`)

    return (
        <div className="section-wrapper">
            <div className="section-header">
                <div className="section-title-wrapper">{sensor.name} Data</div>
            </div>
            <div className="section-content col charts-wrapper">

                { (sensorData.length > 0) ? displayCharts() : "" }

           
            </div>
        </div>
    )
}

export default SensorData