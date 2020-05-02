import React, { useState, useEffect, useRef } from 'react'
import save_bild from '../../images/save.png'
import './Text.css'

const Text = (props) => {

    const textareaRef = useRef(null)
    const [text, setText] = useState(props.text)
    const [color, setColor] = useState(null)
    const [open, setOpen] = useState(false)

    const updateText = async () => {
        try {
            const response = await fetch('/recipe/api/v1.0/edit_text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text,
                    recipeId: props.recipeId
                }),
            })

            if (response.status !== 200) { throw new Error("error") }
            setColor(null)
            setOpen(false)
        } catch {
            setColor(null)
            setOpen(false)
        }
    }

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [text]);

    return (
        <div className="text__container" style={{ backgroundColor: color }}>
            <div className="text__header_container">
                <div className="text__header_text">
                    <div>Zubereitung:</div>
                </div>
                {open ? (
                    <div className="text__save" onClick={() => updateText()}>
                        <img src={save_bild} alt='save' height='50px'></img>
                    </div>
                ) : null}
            </div>
            <div className="text__textarea_container">
                <textarea
                    className="text__textarea"
                    ref={textareaRef}
                    value={text}
                    onChange={e => { setText(e.target.value); setColor('rgb(235, 162, 162)'); setOpen(true) }}
                />
            </div>
        </div>
    )
}

export default Text