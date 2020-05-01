import React, { useState, useEffect } from 'react'
import './Gruppe.css'
import Zutat from '../Zutat/Zutat'
import save_bild from '../../images/save.png'
import Alert from '../Alert/Alert'

const Gruppe = (props) => {

    const [ingredients, setIngredients] = useState(props.ingredients || [])
    const [message, setMessage] = useState(null)
    const [group, setGroup] = useState(props.group)
    const [color, setColor] = useState(null);
    const [open, setOpen] = useState(false)

    const removeIngredient = (id) => {
        setIngredients(ingredients.filter(x => x.id !== id))
    }

    const updateIngredient = (x) => {
        if (ingredients.map(y => y.id).includes(x.id)) {
            setIngredients(
                ingredients.map(y => y.id === x.id ? x : y)
            )
        } else {
            setIngredients(ingredients.map(y => y.id === -1 ? x : y))
        }
    }
    
    const getGroup = () => group

    const items = ingredients.map(
        x => {
            let tmp = group
            return (
                <Zutat
                    key={'Create-Ingredients-' + x.id}
                    removeIngredient={removeIngredient}
                    updateIngredient={updateIngredient}
                    getGroup={getGroup}
                    preset={props.preset}
                    ingredient={x}
                    recipeId={props.recipeId}
                    group={tmp}
                ></Zutat>
            )
        }
    )

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

    const updateGroup = async () => {
        try {
            const response = await fetch('/recipe/api/v1.0/edit_group', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    group: group,
                    oldGroup: props.group,
                    recipeId: props.recipeId
                }),
            })

            if (response.status !== 200) { throw new Error("error") }
            props.updateGroup(props.group, group)
            setColor('rgb(194, 223, 233)')
            setOpen(false)
        } catch {
            refreshMessage(1)
            setOpen(false)
        }
    }

    const handleSave = (e) => {
        setGroup(e.target.value)
        e.target.value ? setOpen(true) : setOpen(false)
        setColor('rgb(235, 162, 162)')
    }

    useEffect(() => {
        if (!ingredients.filter(x => x.id === -1).length) {
            setIngredients([...ingredients, { "id": -1 }])
        }
    }, [ingredients]);


    return (
        <div className='gruppe__container'>
            {message ? <Alert message={message}></Alert> : null}
            <div className='gruppe__header_container' style={{ backgroundColor: color }}>
                <div className='gruppe__header'>
                    <input
                        type="text"
                        placeholder="Zutatengruppe ..."
                        value={group}
                        onChange={(e) => handleSave(e) }
                    >
                    </input>
                </div>
                {open ? (
                    <div className='gruppe_save' onClick={() => updateGroup()}>
                        <img src={save_bild} alt='save' height='40px'></img>
                    </div>
                ) : null}
            </div>
            { group && !open ? items : null}
        </div>
    )
}

export default Gruppe;