import { useState, useEffect } from 'react'
import { funFetch } from './funFetch'
import DummyData from '../../dummyData.json'

const useFetch = (endpoint, options, dummy = null) => {

    const [response, setResponse] = useState(null)
    const optionsString = JSON.stringify(options)

    useEffect(() => {
        const fetchAsync = async () => {
            let res = await funFetch(endpoint, optionsString)
            res ? setResponse(res) : setResponse(DummyData[dummy])
        }
        fetchAsync()
    }, [endpoint, optionsString, dummy])

    return response

}

export default useFetch