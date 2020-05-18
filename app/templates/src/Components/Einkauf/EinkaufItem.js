import React from 'react'
import './EinkaufItem.css'

import remove_bild from '../../images/close.png'

const EinkaufItem = (props) => {

    const handleRemoveClick = () => {
        props.deleteItem(props.item.id)
    }

    return (
        <div className='einkauf_item__container'>
            <div className='einkauf_item__text'>
                {props.item.quantity} {props.item.unit} {props.item.item}
            </div>
            <div className='einkauf_item__delete'>
                <img src={remove_bild} onClick={() => handleRemoveClick()} alt='edit' height='40px'></img>
            </div>
        </div>
    )
}

export default EinkaufItem