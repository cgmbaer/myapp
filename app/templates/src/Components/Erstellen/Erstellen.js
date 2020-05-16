import React, { useState, useRef } from "react"
import './Erstellen.css'

import Bilder from '../Bilder/Bilder'
import Tags from '../Tags/Tags'
import Zutaten from '../Zutaten/Zutaten'
import Text from '../Text/Text'

import useFetch from '../hooks/useFetch'
import { funFetch } from '../hooks/funFetch'

import save_bild from '../../images/save.png'

const Erstellen = (props) => {

    // console.log('Erstellen render')

    const recipe = props.location.state

    const [recipeId, setRecipeId] = useState(recipe.id || null)
    const [color, setColor] = useState(null)

    const refRecipeName = useRef(recipe.name)

    const data = useFetch('get_items',
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        },
        "Items"
    );

    const handleClick = async () => {
        let res = await funFetch('set_recipeName',
            JSON.stringify({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipeId: recipeId,
                    recipeName: refRecipeName.current.value
                })
            })
        )
        console.log(res)
        res ? setRecipeId(res.recipeId) : setRecipeId(-1)
        setColor(null)
    }

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