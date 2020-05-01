import React, { useState, useEffect, useRef } from 'react'
import './Text.css'

const Text = (props) => {

    const textareaRef = useRef(null);
    const [currentValue, setCurrentValue ] = useState("");// you can manage data with it

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [currentValue]);

    return (
        <div className="text__container">
            <div className="text__zubereitung_header">Zubereitung</div>
            <div className="text__textarea_container">
                <textarea
                    className="text__textarea"
                    ref={textareaRef}
                    value={currentValue}
                    onChange={e => setCurrentValue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Text