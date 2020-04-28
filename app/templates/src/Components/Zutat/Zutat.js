import React, { useState } from 'react'
import './Zutat.css'
import save_bild from '../../images/save.png'
import remove_bild from '../../images/close.png'

const Zutat = (props) => {

    const [color, setColor] = useState(null)
    const [quantity, setQuantity] = useState(props.ingredient.quantity || null)
    const [unit, setUnit] = useState(props.ingredient.unit || null)
    const [ingredient, setIngredient] = useState(props.ingredient.name || null)

    const handleRemove = () => {
        props.removeIngredient(props.ingredient.id)
    }

    const handleUpdate = () => {
        props.updateIngredient(4)
    }

    const saveIngredient = () => {
        setColor(null)
    }

    return(
        <div className='zutat__container' style={{backgroundColor: color}}>
            <div className='zutat__remove'>
                <img src={remove_bild} onClick={handleRemove} alt='edit' height='30px'></img>
            </div>
            <div className='zutat__quantity'>
                <input defaultValue={quantity} onChange={()=>setColor('rgb(235, 162, 162)')}></input>
            </div>
            <div className='zutat__unit'>{unit}</div>
            <div className='zutat__ingredient'>{ingredient}</div>
            <div className='zutat__save' onClick={() => saveIngredient()}>
                <img src={save_bild} onClick={handleUpdate} alt='save' height='30px'></img>
            </div>
        </div>
    )
}

export default Zutat