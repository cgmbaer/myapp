import React, { useState, useEffect } from 'react'
import './Zutaten.css'
import Gruppe from '../Gruppe/Gruppe'
import Alert from '../Alert/Alert'

const Zutaten = (props) => {

    const [preset, setPreset] = useState({ 'units': [], 'ingredients': [] })
    const [message, setMessage] = useState(null)
    const [ingredients, setIngredients] = useState(props.ingredients || [])

    const updateGroup = (oldGroup, group) => {
        setIngredients(ingredients.map(x => x.group === oldGroup ? { ...x, group } : x))
    }

    const items = ingredients.map((x, i) => { 
        return (
            <div key={'Create-Groups-' + i} className='zutaten__group_container'>
                <Gruppe
                    preset={preset}
                    group={x.group}
                    ingredients={x.items}
                    recipeId={props.recipeId}
                    updateGroup={updateGroup}
                />
            </div>
        )
    })

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

    useEffect(() => {
        let mounted = true;
        let data = {}
        async function fetchData() {
            try {
                const response = await fetch('/recipe/api/v1.0/get_preset', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                })
                if (mounted) {
                    if (response.status !== 200) { throw new Error("error") }
                    data = await response.json()
                    setPreset(data)
                    refreshMessage(2)
                }
            } catch (error) {
                if (mounted) {
                    setPreset({
                        "units": [
                            { "id": 1, "name": "g" },
                            { "id": 2, "name": "kg" },
                            { "id": 3, "name": "ml" },
                            { "id": 4, "name": "l" },
                            { "id": 5, "name": "kl" },
                            { "id": 6, "name": "gr" },
                            { "id": 7, "name": "mg" },
                        ],
                        "ingredients": [
                            { "id": 1, "name": "Kartoffeln" },
                            { "id": 2, "name": "Schinken" },
                            { "id": 3, "name": "Mehl" },
                            { "id": 4, "name": "getrocknete Tomaten" }
                        ]
                    })
                    refreshMessage(1)
                }
            }
        }
        fetchData()
        return () => { mounted = false };
    }, []);

    useEffect(() => {
        if (!ingredients.filter(x => x.group === '').length) {
            setIngredients([...ingredients, { "group": '' }])
        }
    }, [ingredients])

    return (
        <div className='zutaten__container'>
            {message ? <Alert message={message}></Alert> : null}
            {items}
        </div>
    )
}

export default Zutaten;