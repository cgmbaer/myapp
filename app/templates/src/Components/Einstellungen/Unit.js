import React, { useState } from 'react'
import './Unit.css'

import useCollapse from '../hooks/useCollapse'

import UnitItem from './UnitItem'
// import Dropdown from '../Dropdown/Dropdown'

// import { funFetch } from '../hooks/funFetch'

// import erstellen_zeichen from '../../images/plus.png'

const Unit = (props) => {

    const [units, setUnits] = useState(props.items || [])
    const [open, setOpen] = useState(false)

    const [maxHeight, refCollapse, collapse] = useCollapse()

    const editUnit = (body, index) => {
        let newArray = [...units]
        newArray[index] = body
        setUnits(newArray)
    }

    const items = [...units, {id: -1}].map(
        (x, index) => {
            return (
                <UnitItem key={'UnitItem-' + index} item={x} index={index} editUnit={editUnit}></UnitItem>
            )
        }
    )

    return (
        <div className='unit__container'>
            <div className='unit__name' onClick={() => setOpen(collapse)}>
                Einheit
            </div>
            <div className='unit__show_container' ref={refCollapse} style={{ maxHeight: maxHeight }}>{items}</div>
        </div>
    )
}

export default Unit