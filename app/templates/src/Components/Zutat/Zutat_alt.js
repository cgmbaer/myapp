import React, { useState } from 'react'
import './Zutat.css'
import save_bild from '../../images/save.png'
import remove_bild from '../../images/close.png'
import Alert from '../Alert/Alert'

const Zutat = (props) => {

    const [color, setColor] = useState(null)
    const [recipeIngredientId, setRecipeIngredientId] = useState(props.ingredient.id || null)
    const [quantity, setQuantity] = useState(props.ingredient.quantity || '')
    const [unitId, setUnitId] = useState(props.ingredient.unit_id || null)
    const [unit, setUnit] = useState(props.ingredient.unit || '')
    const [ingredient, setIngredient] = useState(props.ingredient.ingredient || '')
    const [ingredientId, setIngredientId] = useState(props.ingredient.ingredient_id || null)
    const [uOpen, setUOpen] = useState(false)
    const [iOpen, setIOpen] = useState(false)
    const [message, setMessage] = useState(null)

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

    const saveIngredient = (remove) => {
        let mounted = true;
        async function fetchData() {

            let data = {}
            try {
                const response = await fetch('/recipe/api/v1.0/edit_recipe_ingredient', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: recipeIngredientId,
                        group: props.getGroup(),
                        quantity: quantity,
                        ingredient_id: ingredientId,
                        unit_id: unitId,
                        recipe_id: props.recipeId,
                        remove: remove
                    }),
                })
                if (mounted) {
                    if (response.status !== 200) { throw new Error("error") }
                    data = await response.json()

                    if (data.error) {
                        refreshMessage(1, data.error)
                    } else {
                        setRecipeIngredientId(data.id)
                        if (remove) {
                            props.removeIngredient(props.ingredient.id)
                        } else {
                            handleUpdate(data.id)
                            setColor(null)
                        }
                    }
                }
            } catch (error) {
                if (mounted) {
                    if (remove) {
                        props.removeIngredient(props.ingredient.id)
                    } else {
                        setColor(null)
                        handleUpdate(8)
                    }
                }
            }
        }
        fetchData()
        return () => { mounted = false };
    }

    const handleUpdate = (id) => {
        let tmp = {
            "id": id,
            "group": props.getGroup(),
            "unit_id": unitId,
            "ingredient_id": ingredientId,
            "quantity": quantity,
            "unit": unit,
            "ingredient": ingredient
        }
        props.updateIngredient(tmp)
    }

    const handleIngredientClick = (e, id) => {
        setIngredientId(id);
        setIngredient(e.currentTarget.innerHTML)
        setIOpen(false)
        setColor('rgb(235, 162, 162)')
    }

    const handleUnitClick = (e, id) => {
        setUnitId(id);
        setUnit(e.currentTarget.innerHTML)
        setUOpen(false)
        setColor('rgb(235, 162, 162)')
    }

    const dropDownIngredient = props.preset.ingredients.filter(x => x.name.toLowerCase().includes(ingredient.toLowerCase())).map((x) => {
        return (
            <div
                className='zutat__dropdown_item'
                key={'ingredient_dropDown-' + x.id}
                onClick={(e) => handleIngredientClick(e, x.id)}
            >
                {x.name}
            </div>
        )
    })

    const dropDownUnit = props.preset.units.filter(x => x.name.toLowerCase().includes(unit.toLowerCase())).map((x) => {
        return (
            <div
                className='zutat__dropdown_item'
                key={'unit_dropDown-' + x.id}
                onClick={(e) => handleUnitClick(e, x.id)}
            >
                {x.name}
            </div>
        )
    })

    return (
        <div className='zutat__container' style={{ backgroundColor: color }}>
            {message ? <Alert message={message}></Alert> : null}
            <div className='zutat__remove'>
                <img src={remove_bild} onClick={() => saveIngredient(true)} alt='edit' height='30px'></img>
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
                <input
                    type='text'
                    onClick={() => { setUOpen(!uOpen) }}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder='kg ...'
                    value={unit}></input>
                {uOpen ? (
                    <div className='zutat__dropdown'>
                        {dropDownUnit}
                    </div>
                ) : null}
            </div>
            <div className='zutat__ingredient'>
                <input
                    type='text'
                    placeholder='Schweineschmalz ...'
                    onClick={() => { setIOpen(!iOpen) }}
                    onChange={(e) => setIngredient(e.target.value)}
                    value={ingredient}></input>
                {iOpen ? (
                    <div className='zutat__dropdown'>
                        {dropDownIngredient}
                    </div>
                ) : null}
            </div>
            {!(color === 'rgb(235, 162, 162)') || (uOpen || iOpen || ingredient === '') ? null : (
                <div className='zutat__save' onClick={() => saveIngredient(false)}>
                    <img src={save_bild} alt='save' height='30px'></img>
                </div>
            )}
        </div>
    )
}

export default Zutat