import React, { useState, useEffect } from 'react'
import './Zutaten.css'
import Gruppe from '../Gruppe/Gruppe'

const Zutaten = (props) => {

    const [ingredients, setIngredients] = useState(props.ingredients || [])

    const updateGroup = (oldGroup, group) => {
        setIngredients(ingredients.map(x => x.group === oldGroup ? { ...x, group } : x))
    }

    const items = ingredients.map((x, i) => { 
        return (
            <div key={'Create-Groups-' + i} className='zutaten__group_container'>
                <Gruppe
                    preset={props.items}
                    group={x.group}
                    ingredients={x.items}
                    recipeId={props.recipeId}
                    updateGroup={updateGroup}
                />
            </div>
        )
    })

    useEffect(() => {
        if (!ingredients.filter(x => x.group === '').length) {
            setIngredients([...ingredients, { "group": '' }])
        }
    }, [ingredients])

    return (
        <div className='zutaten__container'>
            {items}
        </div>
    )
}

export default Zutaten;