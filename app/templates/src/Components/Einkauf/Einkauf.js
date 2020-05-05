import React from 'react'
import './Einkauf.css'

const Einkauf = (props) => {

    const handleClearClick = async () => {
        try {
            const response = await fetch('/recipe/api/v1.0/edit_shopping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clear: true
                }),
            })

            if (response.status !== 200) { throw new Error("error") }
        } catch {
        }
    }

    return (
        <div className="einkauf__container" onClick={() => handleClearClick()}>
            <div>
                Einkauf
            </div>
        </div>
    )
}

export default Einkauf