import React, { useState, useEffect } from 'react'
import './Einkauf.css'

import useFetch from '../hooks/useFetch'

const Einkauf = () => {

    const [items, setItems] = useState([])
    const [recipes, setRecipes] = useState(null)
    const [categories, setCategories] = useState(null)
    const [active, setActive] = useState(false)

    const res = useFetch('get_shopping',
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        },
        "Shopping"
    );

    const data = res.response || []

    useFetch('edit_shopping',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clear: true
            }),
        },
        "Update",
        active
    )

    const recipe_items = recipes ? recipes.map((x, index) => {
        return (
            <div key={index}>{x.name}</div>
        )
    }) : null

    useEffect(() => {
        // setCategories([...new Set(data.map(x => x.category))])
        setRecipes([...new Set(data.map(x => { return { 'id': x.recipe_id, 'name': x.recipe_name } }))])
    }, [data]);

    return (
        <div className="einkauf__container" onClick={() => setActive(true)}>
            <div>
                {recipe_items}
            </div>
        </div>
    )
}

export default Einkauf