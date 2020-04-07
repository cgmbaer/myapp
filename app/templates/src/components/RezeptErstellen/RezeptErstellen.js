import React, { useState, useRef } from 'react';
import './RezeptErstellen.css';
import { Collapse } from 'react-collapse';
import RezeptBild from './subcomponents/RezeptBild/RezeptBild';

const RezeptErstellen = (props) => {

    const [recipeId, setRecipeId] = useState(props.recipeId || null);
    const [recipeTitle, setRecipeTitle] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [textEditable, setTextEditable] = useState(false);

    const refRecipeTitle = useRef();

    const toggle = () => {
        setIsOpen(!isOpen);
        setTextEditable(!textEditable);
    }

    const setRecipe = async () => {
        
        setRecipeTitle(refRecipeTitle.current.value);

        const response = await fetch('/recipe/api/v1.0/add_recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                recipeId: recipeId,
                recipeTitle: refRecipeTitle.current.value
             }),
        })
    
        console.log(await response.json())
    
        setIsOpen(!isOpen);
        setTextEditable(!textEditable);
    }

    return (
        <div className='rezept_erstellen__container'>
            <div className='rezept_titel__container'>
                {
                    textEditable ?
                        recipeTitle ?
                            <input className='rezept_titel_editable' autoFocus={true} ref={refRecipeTitle} defaultValue={recipeTitle} />
                            :
                            <input className='rezept_titel_editable' autoFocus={true} ref={refRecipeTitle} placeholder={'Rezepttitel eingeben...'} />
                        :
                        recipeTitle ?
                            <div className='rezept_titel_fixed' onClick={() => toggle()}>
                                {recipeTitle}
                            </div>
                            :
                            <div className='rezept_titel_fixed' onClick={() => toggle()}>
                                Rezepttitel ...
                            </div>
                }
                <Collapse isOpened={isOpen}>
                    <div className='rezept_titel__collapse'>
                        <div className='rezept_titel__collapse_button' onClick={() => setRecipe()}>
                            Speichern
                    </div>
                    </div>
                </Collapse>
            </div>
            {
                recipeId ?
                    <div>
                        <hr />
                        <RezeptBild recipeId={recipeId} />
                        <hr />
                    </div>
                    :
                    <hr />
            }
        </div>
    )
}

export default RezeptErstellen;