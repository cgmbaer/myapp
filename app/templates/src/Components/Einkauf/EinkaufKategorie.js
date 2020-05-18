import React from 'react'
import './EinkaufKategorie.css'

import EinkaufItem from './EinkaufItem'

const EinkaufKategorie = (props) => {

    const items = props.category.items.map((x, index) => {
        return (
            <EinkaufItem key={'EinkaufItem-' + props.index + '-' + index} item={x} deleteItem = {props.deleteItem}/>
        )
    })

    return (
        <div className='einkauf_kategorie__container'>
            <div className='einkauf_kategorie__text'>{props.category.category}:</div>
            {items}
        </div>
    )
}

export default EinkaufKategorie