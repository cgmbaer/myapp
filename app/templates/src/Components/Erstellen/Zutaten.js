import React, { useState } from 'react'
import './Zutaten.css'
import Gruppe from './Gruppe'

const Zutaten = (props) => {

    const [ingredients, setIngredients] = useState(props.ingredients || [])

    const updateGroup = (index) => {
        if(index >= ingredients.length) setIngredients([...ingredients, { "group": '' }])
    }

    const items = [...ingredients, { "group": '' }].map((x, index) => { 
        return (
            <div key={'Gruppe-' + index} className='zutaten__group_container'>
                <Gruppe
                    preset={props.items}
                    group={x.group}
                    index={index}
                    ingredients={x.items}
                    recipeId={props.recipeId}
                    updateGroup={updateGroup}
                />
            </div>
        )
    })

    return (
        <div className='zutaten__container'>
            {items}
        </div>
    )
}

export default Zutaten;