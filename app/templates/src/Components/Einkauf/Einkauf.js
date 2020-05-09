import React, { useState, useEffect } from 'react'
import './Einkauf.css'
import Alert from '../Alert/Alert'

const Einkauf = () => {

    const [items, setItems] = useState(null)
    const [recipes, setRecipes] = useState(null)
    const [categories, setCategories] = useState(null)
    const [message, setMessage] = useState(null)

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

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

    const recipe_items = recipes ? recipes.map(x => {
        return(
            <div>{x.name}</div>
        )
    }) : null

    useEffect(() => {
        let mounted = true;
        let data = [{"recipe_name":"Wiener Schnitzel","id":1,"recipe_id":1,"quantity":15.0,"unit":"gr","item":"Butter","ingredient_id":1,"category":"Obst & Gem\u00fcse"},
        {"recipe_name":"Wiener Schnitzel","id":2,"recipe_id":1,"quantity":233.0,"unit":"ml","item":"Milch","ingredient_id":3,"category":null},
        {"recipe_name":"Wiener Schnitzel","id":3,"recipe_id":1,"quantity":432.0,"unit":"gr","item":"Zucker","ingredient_id":2,"category":"Brot"}]
        async function fetchData() {
            try {
                const response = await fetch('/recipe/api/v1.0/get_shopping', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                })
                if (mounted) {
                    if (response.status !== 200) { throw new Error("error") }
                    data = await response.json()
                    setItems(data)
                    refreshMessage(2)
                }
            } catch (error) {
                if (mounted) {
                    refreshMessage(1)
                }
            }
        }
        fetchData()
        setCategories([...new Set(data.map(x => x.category))])
        setRecipes([...new Set(data.map(x => {return {'id': x.recipe_id, 'name': x.recipe_name}}))])
        return () => { mounted = false };
    }, []);

    return (
        <div className="einkauf__container" onClick={() => handleClearClick()}>
            <div>
                {recipe_items}
            </div>
        </div>
    )
}

export default Einkauf