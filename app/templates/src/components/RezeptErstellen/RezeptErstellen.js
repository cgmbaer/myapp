import React, { useState, useRef } from 'react';
import './RezeptErstellen.css';
import { Collapse } from 'react-collapse';
import RezeptBild from './subcomponents/RezeptBild/RezeptBild';
import RezeptZutaten from './subcomponents/RezeptZutaten/RezeptZutaten';
import ErrorViewer from './subcomponents/ErrorViewer/ErrorViewer';

const RezeptErstellen = (props) => {

    const [recipeId, setRecipeId] = useState(props.location.state.id || null);
    const [recipeTitle, setRecipeTitle] = useState(props.location.state.name || null);
    const [isOpen, setIsOpen] = useState(false);
    const [textEditable, setTextEditable] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const refRecipeTitle = useRef();

    const toggle = () => {
        setIsOpen(!isOpen);
        setTextEditable(!textEditable);
    }

    const setRecipe = async () => {

        setRecipeTitle(refRecipeTitle.current.value);
        let data = {}

        try {
            const response = await fetch('/recipe/api/v1.0/add_recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipeId: recipeId,
                    recipeTitle: refRecipeTitle.current.value
                }),
            })

            data = await response.json();

        } catch (error) {
            data = { 'recipeId': -1 };
        }

        if (data.recipeId) {
            setRecipeId(data.recipeId);
            setIsOpen(!isOpen);
            setTextEditable(!textEditable);
        } else {
            setErrorMessage(data.error);
            setTimeout(() => setErrorMessage(null), 3000);
        }
    }

    return (
        <div className='rezept_erstellen__container'>
            <ErrorViewer errorMessage={errorMessage}></ErrorViewer>
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
                        <RezeptBild recipeId={recipeId} has_image={props.location.state.has_image} has_photo={props.location.state.has_photo} />
                        <hr />
                        <RezeptZutaten recipeId={recipeId} recipeIngredients={props.location.state.ingredients}></RezeptZutaten>
                    </div>
                    :
                    <hr />
            }
        </div>
    )
}

export default RezeptErstellen;