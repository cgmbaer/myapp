import React, { useState } from 'react'
import './UnitItem.css'

import { funFetch } from '../hooks/funFetch'

import save_bild from '../../images/save.png'

const UnitItem = (props) => {

    const [id, setId] = useState(props.item.id)
    const [name, setName] = useState(props.item.name || '')
    const [group, setGroup] = useState(props.item.group || '')
    const [factor, setFactor] = useState(props.item.factor || '')
    const [color, setColor] = useState(null)
    
    const handleSaveClick = async () => {

        let body = {
            id: id,
            name: name,
            group: group,
            factor: factor,
        }

        let res = await funFetch('add_unit', body) 

        if (id === -1) {
            if (res) {
                setId(res.id)
                body.id = res.id
            } else {
                setId(0)
            }
        }

        props.editUnit(body, props.index)
        setColor(null)
    }

    return (
        <div className='unit_item__container' style={{backgroundColor: color}}>
            <div className='unit_item__name'>
                <input
                    type='text'
                    value={name}
                    placeholder='Unit ...'
                    onChange={(e) => { setColor('rgb(235, 162, 162)'); setName(e.target.value) }}
                >
                </input>
            </div>
            <div className='unit_item__group'>
                <input
                    type='text'
                    value={group}
                    placeholder='Basis ...'
                    onChange={(e) => { setColor('rgb(235, 162, 162)'); setGroup(e.target.value) }}
                >
                </input>
            </div>
            <div className='unit_item__factor'>
                <input
                    type='text'
                    value={factor}
                    placeholder='Faktor ...'
                    onChange={(e) => { setColor('rgb(235, 162, 162)'); setFactor(e.target.value) }}
                >
                </input>
            </div>
            {color === 'rgb(235, 162, 162)' && name ? (
                <div className='unit_item__save' onClick={() => handleSaveClick()}>
                    <img src={save_bild} alt='save' height='30px'></img>
                </div>
            ) : null}
        </div>
    )
}

export default UnitItem