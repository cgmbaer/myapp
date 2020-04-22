import React from 'react'
import './Alert.css'

const Alert = (props) => {

    const showMessage = () => {
        switch (props.message.eType) {
            case 1:
                return (
                    <div className='alert__negative'>{props.message.eMessage ? props.message.eMessage : 'Error: Call an adult!'}</div>
                )
            case 2:
                return (
                    <div className='alert__positive'>{'Success'}</div>
                )
            default:
                return (
                    null
                )
        }
    }

    return (
        <div className='alert__container'>{showMessage()}</div>
    )
}

export default Alert;