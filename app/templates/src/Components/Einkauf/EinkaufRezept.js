import React from 'react'
import './EinkaufRezept.css'

import remove_bild from '../../images/close.png'

const EinkaufRezept = (props) => {

    const handleRemoveClick = () => {
        props.deleteRecipe(props.recipe.recipe_id)
    }

    return (
        <div className='einkauf_rezept__container'>
            <div className="einkauf_rezept__text">{props.recipe.recipe_name}</div>
            <div className="einkauf_rezept__delete">
                <img src={remove_bild} onClick={() => handleRemoveClick()} alt='edit' height='40px'></img>
            </div>
        </div>
    )
}

export default EinkaufRezept