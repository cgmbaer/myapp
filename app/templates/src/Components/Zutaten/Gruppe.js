import React, { useState, useRef } from 'react'
import './Gruppe.css'

import Zutat from './Zutat'

import { funFetch } from '../hooks/funFetch'

import save_bild from '../../images/save.png'

const Gruppe = (props) => {

    // console.log("Gruppe render: " + props.group)

    const [group, setGroup] = useState(props.group)
    const [ingredients, setIngredients] = useState(props.ingredients || [])
    const [color, setColor] = useState(null);
    const [open, setOpen] = useState(false)

    const refGroup = useRef(group)

    const addIngredient = () => {
        setIngredients([...ingredients, { "id": -1 }])
    }

    const items = [...ingredients, { "id": -1 }].map(
        (x, index) => {
            return (
                <Zutat
                    key={'Zutat-' + props.groupIndex + '-' + index}
                    addIngredient={addIngredient}
                    preset={props.preset}
                    ingredient={x}
                    recipeId={props.recipeId}
                    group={group}
                ></Zutat>
            )
        }
    )

    const handleClick = () => {
        funFetch('edit_group',
            JSON.stringify({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    group: refGroup.current.value,
                    oldGroup: group,
                    recipeId: props.recipeId
                }),
            })
        )
        props.updateGroup(props.groupIndex)
        setGroup(refGroup.current.value)
        setColor('rgb(194, 223, 233)')
        setOpen(false)
    }

    const handleChange = (e) => {
        if (e.target.value) {
            setOpen(true)
            setColor('rgb(235, 162, 162)')
        } else setOpen(false)
    }

    return (
        <div className='gruppe__container'>
            <div className='gruppe__header_container' style={{ backgroundColor: color }}>
                <div className='gruppe__header'>
                    <input
                        ref={refGroup}
                        type="text"
                        placeholder="Zutatengruppe ..."
                        defaultValue={props.group}
                        onChange={(e) => handleChange(e)}
                    >
                    </input>
                </div>
                {open ? (
                    <div className='gruppe_save' onClick={() => handleClick()}>
                        <img src={save_bild} alt='save' height='40px'></img>
                    </div>
                ) : null}
            </div>
            {group ? items : null}
        </div>
    )
}

export default Gruppe;