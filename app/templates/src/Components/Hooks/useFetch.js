import { useState, useEffect } from 'react'
import { funFetch } from './funFetch'
import DummyData from '../../dummyData.json'

const useFetch = (endpoint, dummy = null) => {

    const [response, setResponse] = useState(null)

    useEffect(() => {
        const fetchAsync = async () => {
            let res = await funFetch(endpoint, null, 'GET', { 'Accept': 'application/json' })
            res ? setResponse(res) : setResponse(DummyData[dummy])
        }
        fetchAsync()
    }, [endpoint, dummy])

    return response

}

export default useFetch