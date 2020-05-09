import React, { useState, useRef, useEffect } from "react"
import './Erstellen.css'

import Bilder from '../Bilder/Bilder'
import Tags from '../Tags/Tags'
import Zutaten from '../Zutaten/Zutaten'
import Text from '../Text/Text'

import useFetch from '../hooks/useFetch'

import save_bild from '../../images/save.png'

const Erstellen = (props) => {

    const recipe = props.location.state

    const [recipeId, setRecipeId] = useState(recipe.id || null)
    const [recipeName, setRecipeName] = useState(recipe.name || null)
    const [active, setActive] = useState(false)
    const [color, setColor] = useState(null)

    const refRecipeId = useRef(recipeId)
    const refRecipeName = useRef(recipeName)

    const res = useFetch('get_items',
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        },
        "Items"
    );

    const data = res.response

    const update = useFetch('set_recipeName',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipeId: refRecipeId.current,
                recipeName: recipeName
            })
        },
        "Update",
        active
    )

    const handleClick = () => {
        refRecipeId.current = recipeId
        setActive(true)
        setRecipeName(refRecipeName.current.value)
        setColor(null)
    }

    useEffect(() => {
        if (update.response) {
            setRecipeId(update.response.recipeId)
        }
    }, [update.response])

    return (
        <div className='erstellen__container' >
            <div className='erstellen__name_container' style={{ backgroundColor: color }}>
                <div className='erstellen__name_input'>
                    <input
                        ref={refRecipeName}
                        defaultValue={recipe.name}
                        placeholder='Rezepttitel eingeben...'
                        onChange={() => setColor('rgb(235, 162, 162)')}
                    />
                </div>
                <div className="erstellen__name_speichern" onClick={() => handleClick()}>
                    <img src={save_bild} alt='save' height='50px'></img>
                </div>
            </div>
            {recipeId && data ? (
                <div>
                    <Bilder
                        recipeId={recipeId}
                        imageFilename={recipe.image_filename}
                        photoFilename={recipe.photo_filename}>
                    </Bilder>
                    <Tags tags={recipe.tags} items={data.tag} recipeId={recipeId} />
                    <Zutaten ingredients={recipe.ingredients} items={data} recipeId={recipeId} />
                    <Text text={recipe.description} recipeId={recipeId} />
                </div>
            ) : null}
        </div >
    )
}

export default Erstellen;