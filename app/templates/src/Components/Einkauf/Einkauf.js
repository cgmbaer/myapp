import React, { useState, useEffect } from 'react'
import './Einkauf.css'

import useFetch from '../hooks/useFetch'
import { funFetch } from '../hooks/funFetch'

const Einkauf = () => {

    const [items, setItems] = useState(null)
    const [recipes, setRecipes] = useState(null)
    // const [categories, setCategories] = useState(null)

    const data = useFetch('get_shopping', 'shopping')

    const recipe_items = recipes ? recipes.map((x, index) => {
        return (
            <div key={x.recipe_name + index} className="shopping__recipe_container">
                <div className="shopping__recipe_text">{x.recipe_name}</div>
            </div>
        )
    }) : null

    const list_items = items ? items.map((x, index) => {
        console.log()
        return (
            <div key={x.category + index}>
                <div>{x.category}</div>
                {x.items.map((y, index2) => {
                    return (
                        <div key={y.item + index2}>{y.quantity} {y.unit} {y.item}</div>
                    )
                })}
            </div>
        )
    }) : null

    const handleClearClick = () => {
        setRecipes([])
        setItems([])
        funFetch('edit_shopping', { clear: true })
    }

    useEffect(() => {
        if (data) {
            setItems(data.ingredients)
            setRecipes(data.recipes)
        }
    }, [data]);

    return (
        <div className="einkauf__container">
            <div onClick={() => handleClearClick()}>
                {recipe_items}
            </div>
            <div onClick={() => { navigator.clipboard.writeText('asdf') }}>
                {list_items}
            </div>
        </div>
    )
}

export default Einkauf