import { useState, useRef } from 'react'

function SmoothVerticalScrolling(e, time, where) {
    console.log('1234')
    var eTop = e.getBoundingClientRect().top;
    var eAmt = eTop / 100;
    var curTime = 0;
    while (curTime <= time) {
        window.setTimeout(SVS_B, curTime, eAmt, where);
        curTime += time / 100;
    }
}

function SVS_B(eAmt, where) {
    if(where === "center" || where === "")
        window.scrollBy(0, eAmt / 2);
    if (where === "top")
        window.scrollBy(0, eAmt);
}

const useCollapse = () => {

    const [maxHeight, setMaxHeight] = useState(null)
    const refCollapse = useRef()
    const refScrollElement = useRef()

    const collapse = (element) => {
        if (maxHeight) {
            setMaxHeight(null);
        } else {
            setMaxHeight(refCollapse.current.scrollHeight + "px");
        }
        SmoothVerticalScrolling(refScrollElement.current, 500, "top")
    }

    return [maxHeight, refCollapse, refScrollElement, collapse]
}

export default useCollapse