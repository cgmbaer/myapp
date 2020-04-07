import React, { useState, useRef } from 'react';
import './RezeptTitel.css';
import { Collapse } from 'react-collapse';

const RezeptTitel = (props) => {

    const [recipeTitle, setRecipeTitle] = useState(props.recipeTitle);
    const [isOpen, setIsOpen] = useState(false);
    const [textEditable, setTextEditable] = useState(false);

    const refRecipeTitle = useRef();

    let recipeId = props.recipeId;

    const toggle = () => {
        setIsOpen(!isOpen);
        setTextEditable(!textEditable);
    }

    const setRecipe = () => {
        setRecipeTitle(refRecipeTitle.current.value);

        console.log('Rezept wurde gespeichert');
        recipeId = 2;
        console.log('recipeId: ' + recipeId);

        setIsOpen(!isOpen);
        setTextEditable(!textEditable);
    }

    return (
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
                            Hier klicken um Rezepttitel einzugeben ...
                        </div>
            }
            <Collapse isOpened={isOpen}>
                <div className='rezept_titel__collapse'>
                    <div className='rezept_titel__collapse_button' onClick={() => setRecipe()}>
                       Speichern
                    </div>
                </div>
            </Collapse>
            <hr />
        </div>
    )
}

export default RezeptTitel;