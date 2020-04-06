import React from 'react';
import './RezeptErstellen.css'
import RezeptTitel from './subcomponents/RezeptTitel/RezeptTitel'

const RezeptErstellen = (props) => {
    const recipeId = 5;
    const recipeTitle = 'Wiener Schnitzel';

    return (
        <div className='rezept_erstellen__container'>
            <RezeptTitel recipeId={recipeId} recipeTitle={recipeTitle}></RezeptTitel>
        </div>
    )
}

export default RezeptErstellen;