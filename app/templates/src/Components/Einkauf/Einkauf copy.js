import React, { useState, useEffect } from 'react'
import './Einkauf.css'

import useFetch from '../hooks/useFetch'

const Einkauf = () => {

    const [items, setItems] = useState([])
    const [recipes, setRecipes] = useState(null)
    const [categories, setCategories] = useState(null)

    const res = useFetch('get_shopping',
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        },
        "Shopping"
    );

    const data = res.response || []

    const handleClearClick = async () => {
        try {
            const response = await fetch('/recipe/api/v1.0/edit_shopping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clear: true
                }),
            })

            if (response.status !== 200) { throw new Error("error") }
        } catch {
        }
    }

    const recipe_items = recipes ? recipes.map((x, index) => {
        return (
            <div key={index}>{x.name}</div>
        )
    }) : null

    useEffect(() => {
        // setCategories([...new Set(data.map(x => x.category))])
        // setRecipes([...new Set(data.map(x => { return { 'id': x.recipe_id, 'name': x.recipe_name } }))])
    }, [data]);

    return (
        <div className="einkauf__container" onClick={() => handleClearClick()}>
            <div>
                {recipe_items}
            </div>
        </div>
    )
}

export default Einkauf