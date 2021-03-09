import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {

    const token = localStorage.getItem("idToken")
    config.headers.Authorization = `Bearer ${token}`
    return config

})


export default function UserProvider(props) {

    const initState = {

        sensors: [],
        selectedSensor: -1

    }

    const [ userState, setUserState ] = useState(initState)

    let getSensors = () => {

        return axios.get("api/sensors")
    
    }

    let updateSelectedSensor = (sensorId) => {

        setUserState(prevUserState => ({
            ...prevUserState,
            selectedSensor: sensorId
        }))

    }

    let getCurrentConditions = () => {

        return axios.get("api/readings/current")
        
    }

    return (
        <UserContext.Provider
            value={{
                ...userState,
                getSensors,
                getCurrentConditions,
                updateSelectedSensor
                
            }}>
                { props.children }
            </UserContext.Provider>
    )

}

