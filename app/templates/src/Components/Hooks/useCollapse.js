import { useState, useRef } from 'react'

const useCollapse = () => {

    const [maxHeight, setMaxHeight] = useState(null)
    const refCollapse = useRef()

    const collapse = () => {
        if (maxHeight) {
            setMaxHeight(null);
        } else {
            setMaxHeight(refCollapse.current.scrollHeight + "px");
        }
    }

    return [maxHeight, refCollapse, collapse]
}

export default useCollapse