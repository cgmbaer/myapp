import React, { useState } from 'react'
import './Zutat.css'

import Dropdown from '../Dropdown/Dropdown'
import { funFetch } from '../hooks/funFetch'

import save_bild from '../../images/save.png'
import remove_bild from '../../images/close.png'
import moveup_bild from '../../images/moveup.png'


const Zutat = (props) => {

    const [id, setId] = useState(props.ingredient.id || '')
    const [quantity, setQuantity] = useState(props.ingredient.quantity || '')
    const [unitId, setUnitId] = useState(props.ingredient.unit_id || null)
    const [unit, setUnit] = useState(props.ingredient.unit || '...')
    const [ingredient, setIngredient] = useState(props.ingredient.ingredient || '...')
    const [ingredientId, setIngredientId] = useState(props.ingredient.ingredient_id || null)
    const [open, setOpen] = useState(true)
    const [uOpen, setUOpen] = useState(false)
    const [iOpen, setIOpen] = useState(false)
    const [color, setColor] = useState(null)

    const handleSaveClick = async () => {
        let body = {
            id: id,
            group: props.group,
            quantity: quantity,
            ingredient_id: ingredientId,
            unit_id: unitId,
            recipe_id: props.recipeId
        }

        let res = await funFetch('edit_recipe_ingredient', body)

        if (id === -1) {
            if (res) {
                setId(res.id)
                body.id = res.id
            } else {
                setId(0)
            }
        }

        body.unit = unit
        body.ingredient = ingredient
        props.addIngredient(body, props.index)
        setColor(null)
    }

    const handleRemoveClick = async () => {

        funFetch('edit_recipe_ingredient', {
            id: id,
            remove: true
        })

        setOpen(false)
    }

    const handleMoveUpClick = () => {
        props.moveUp(props.index)
    }

    const handleIngredientClick = (id, name) => {
        setIngredientId(id);
        setIngredient(name)
        setIOpen(false)
        setColor('rgb(235, 162, 162)')
    }

    const handleUnitClick = (id, name) => {
        setUnitId(id);
        setUnit(name)
        setUOpen(false)
        setColor('rgb(235, 162, 162)')
    }

    return (
        open ? (
            <div className='zutat__container' style={{ backgroundColor: color }}>
                <div className='zutat__remove'>
                    {id !== -1 ? <img src={remove_bild} onClick={() => handleRemoveClick()} alt='edit' height='30px'></img> : null}
                </div>
                <div className='zutat__quantity'>
                    <input
                        type='text'
                        value={quantity}
                        placeholder='15 ...'
                        onChange={(e) => { setColor('rgb(235, 162, 162)'); setQuantity(e.target.value) }}
                    >
                    </input>
                </div>
                <div className='zutat__unit'>
                    <div onClick={() => { setUOpen(!uOpen); setIOpen(false) }}>{unit}</div>
                    {uOpen ? <Dropdown items={props.preset.unit} callback={handleUnitClick} /> : null}
                </div>
                <div className='zutat__ingredient'>
                    <div onClick={() => { setIOpen(!iOpen); setUOpen(false) }}>{ingredient}</div>
                    {iOpen ? <Dropdown items={props.preset.ingredient} callback={handleIngredientClick} /> : null}
                </div>
                {
                    (color === 'rgb(235, 162, 162)') && !(uOpen || iOpen || ingredient === '') ?
                        (
                            <div className='zutat__save' onClick={() => handleSaveClick()}>
                                <img src={save_bild} alt='save' height='30px'></img>
                            </div>
                        ) :
                        (props.index > 0) && !(uOpen || iOpen || ingredient === '') && !(id === -1) ? (
                            <div className='zutat__save' onClick={() => handleMoveUpClick()}>
                                <img src={moveup_bild} alt='moveup' height='30px'></img>
                            </div>
                        ) : null
                }
            </div>
        ) : null
    )
}

export default Zutat