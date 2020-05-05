import React, { useState, useEffect, useRef } from "react"
import './Erstellen.css'
import save_bild from '../../images/save.png'
import Alert from '../Alert/Alert'
import Bilder from '../Bilder/Bilder'
import Tags from '../Tags/Tags'
import Zutaten from '../Zutaten/Zutaten'
import Text from '../Text/Text'

const Erstellen = (props) => {

    const [recipeId, setRecipeId] = useState(props.location.state.id || null);
    const [recipeName, setRecipeName] = useState(props.location.state.name || null);
    const [items, setItems] = useState(null);
    const [color, setColor] = useState(null);
    const [message, setMessage] = useState(null);

    const refRecipeName = useRef();

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({eType: eType, eMessage: eMessage}), 1)
    }

    const setRecipe = async () => {

        setRecipeName(refRecipeName.current.value);
        let data = {}

        try {
            const response = await fetch('/recipe/api/v1.0/set_recipeName', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipeId: recipeId,
                    recipeName: refRecipeName.current.value
                }),
            })
            if (response.status !== 200) { throw new Error("error") }
            data = await response.json()
            
            if(data.error){
                refreshMessage(1, data.error)
            } else {
                setRecipeId(data.recipeId)
                setColor(null)
                refreshMessage(2)
            }

        } catch (error) {
            setRecipeId(-1)
            refreshMessage(1)
        }
    }

    useEffect(() => {
        let mounted = true;
        let data = {}
        async function fetchData() {
            try {
                const response = await fetch('/recipe/api/v1.0/get_items', {
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
                    setItems({
                        "category": [{ "id": 1, "name": "Obst & Gem\u00fcse" }, { "id": 2, "name": "Brot" }, { "id": 3, "name": "Milchprodukte" }],
                        "ingredient": [{ "category_id": null, "id": 1, "name": "Butter" }],
                        "tag": [{ "id": 1, "name": "vegetarisch" }],
                        "unit": [{ "id": 1, "name": "gr" }]
                    })
                    refreshMessage(1)
                }
            }
        }
        fetchData()
        return () => { mounted = false };
    }, []);

    return (
        <div className='erstellen__container'>
            {message ? <Alert message={message}></Alert> : null}
            <div className='erstellen__name_container' style={{backgroundColor: color}}>
                <div className='erstellen__name_input'>
                    <input
                        ref={refRecipeName}
                        defaultValue={recipeName}
                        placeholder='Rezepttitel eingeben...'
                        onChange={() => setColor('rgb(235, 162, 162)')}
                    />
                </div>
                <div className="erstellen__name_speichern" onClick={() => setRecipe()}>
                    <img src={save_bild} alt='save' height='50px'></img>
                </div>
            </div>
            { recipeId && items ? (
                <div>
                <Bilder
                    recipeId={recipeId}
                    imageFilename={props.location.state.image_filename}
                    photoFilename={props.location.state.photo_filename}>
                </Bilder>
                <Tags tags={props.location.state.tags} items={items.tag} recipeId={recipeId} />
                <Zutaten ingredients={props.location.state.ingredients} items={items} recipeId={recipeId} />
                <Text text={props.location.state.description} recipeId={recipeId} />
                </div>
            ) : null}
        </div>
    )
}

export default Erstellen;