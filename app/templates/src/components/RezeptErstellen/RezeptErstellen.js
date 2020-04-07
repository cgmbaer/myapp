import React, { useState, useRef } from 'react';
import './RezeptErstellen.css';
import { Collapse } from 'react-collapse';
import RezeptBild from './subcomponents/RezeptBild/RezeptBild';

const RezeptErstellen = (props) => {

    const [recipeTitle, setRecipeTitle] = useState('Wiener Schnitzel');
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
            <hr />
            <RezeptBild recipeId={recipeId}/>
            <hr />
        </div>
    )
}

export default RezeptErstellen;