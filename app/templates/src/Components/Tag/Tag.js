import React, { useState, useEffect } from 'react'
import './Tag.css'
import Alert from '../Alert/Alert'

const Tag = (props) => {

    const [active, setActive] = useState(props.active)
    const [color, setColor] = useState('lightgrey')
    const [message, setMessage] = useState(null);

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

    const updateTag = async () => {

        let data = {}

        try {
            const response = await fetch('/recipe/api/v1.0/update_tag', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    active: active,
                    tagId: props.tagId,
                    recipeId: props.recipeId,
                }),
            })

            if (response.status !== 200) { throw new Error("error") }
            data = await response.json()

            if (data.error) {
                refreshMessage(1, data.error)
            } else {
                setActive(!active)
                refreshMessage(2)
            }

        } catch (error) {
            refreshMessage(1)
        }
    }

    useEffect(() => {
        active ? setColor('lightgreen') : setColor('lightgrey')
    }, [active])

    return (
        <div>
            {message ? <Alert message={message}></Alert> : null}
            <div className='tag__container' style={{ backgroundColor: color }} onClick={() => updateTag()}>
                {props.name}
            </div>
        </div>
    )
}

export default Tag;