import { useState, useEffect } from 'react'
import DummyData from '../../dummyData.json'

const useFetch = (endpoint, options, dummy = null, active = true) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const optionsString = JSON.stringify(options)

    useEffect(() => {
        console.log(endpoint + ' ' + optionsString)
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const res = await fetch('/recipe/api/v1.0/' + endpoint, JSON.parse(optionsString))
                const json = await res.json()
                if (res.status !== 200) { throw new Error("error") }
                setResponse(json)
                setIsLoading(false)
            } catch (error) {
                dummy ? setResponse(DummyData[dummy]) : setError(error)
            }
        }
        if(active) fetchData()
    },[endpoint, optionsString, dummy, active])

    return { response, error, isLoading }

}

export default useFetch