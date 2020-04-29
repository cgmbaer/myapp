import React, { useState, useEffect } from 'react'
import './Zutaten.css'
import Zutat from '../Zutat/Zutat'
import plus_bild from '../../images/plus.png'
import Alert from '../Alert/Alert'

const Zutaten = (props) => {

    const [ingredients, setIngredients] = useState(props.ingredients || [])
    const [preset, setPreset] = useState(null)
    const [message, setMessage] = useState(null)

    const removeIngredient = (id) => {
        setIngredients(ingredients.filter(x => x.id !== id))
    }

    const updateIngredient = (id) => {
        setIngredients(
            ingredients.map(x => x.id === -1 ? { ...x, "id": id } : x)
        )
    }

    const items = ingredients.map(
        x => {
            return (
                <Zutat
                    key={'Create-Ingredients-' + x.id}
                    removeIngredient={removeIngredient}
                    updateIngredient={updateIngredient}
                    preset = {preset}
                    ingredient={x}
                    recipeId={props.recipeId}
                ></Zutat>
            )
        }
    )

    const addIngredient = () => {
        console.log(ingredients)
        if(!ingredients.filter(x => x.id === -1).length){
            setIngredients([...ingredients, {"id": -1} ])
        }
    }

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({eType: eType, eMessage: eMessage}), 1)
    }

    const dropDownItems = [
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
        "asdf",
    ]

    const dropDown = dropDownItems.map((x, index) => {
        return(
        <div key={'dropDown-' + index}><br/>{x}</div>
        )
    })

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
                            {"unit_id": 1, "name": "g"},
                            {"unit_id": 2, "name": "kg"},
                            {"unit_id": 3, "name": "ml"},
                            {"unit_id": 4, "name": "l"},
                            {"unit_id": 4, "name": "kl"},
                            {"unit_id": 4, "name": "gr"},
                            {"unit_id": 4, "name": "mg"},
                        ],
                        "ingredients": [
                            {"ingredient_id": 1, "name": "Kartoffeln"},
                            {"ingredient_id": 2, "name": "Schinken"},
                            {"ingredient_id": 3, "name": "Mehl"},
                            {"ingredient_id": 4, "name": "getrocknete Tomaten"}
                        ]
                    })
                    refreshMessage(1)
                }
            }
        }
        fetchData()
        return () => { mounted = false };
    }, []);


    return (
        <div className='zutaten__container'>
            {message ? <Alert message={message}></Alert> : null}
            <div className='zutaten__header'>
                <div className='zutaten__remove_placeholder'></div>
                <div className='zutaten__header_me'>#</div>
                <div className='zutaten__header_unit'>ME</div>
                <div className='zutaten__header_ingr'>Zutat</div>
                <div className='zutaten__plus'>
                    <img src={plus_bild} alt='save' height='40px' onClick={() => addIngredient()}></img>
                </div>
            </div>
            {items}
            <div className='zutaten__dropdown_container'>{dropDown}</div>
        </div>
    )
}

export default Zutaten;