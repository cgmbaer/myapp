import { useState, useEffect } from 'react'

const useFetch = (endpoint, options) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const optionsString = JSON.stringify(options)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const res = await fetch('/recipe/api/v1.0/' + endpoint, JSON.parse(optionsString))
                console.log(res)
                const json = await res.json()
                setResponse(json)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }
        fetchData()
    },[endpoint, optionsString])

    return { response, error, isLoading }

}

export default useFetch