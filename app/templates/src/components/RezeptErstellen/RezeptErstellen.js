import React, { useState } from 'react';
import './RezeptErstellen.css'
import { Collapse } from 'react-collapse';
import RezeptName from './subcomponents/RezeptName/RezeptName'

const RezeptErstellen = (props) => {
    const [recipeId, setRecipeId] = useState(null);

    const callbackFunction = (childData) => {
        setRecipeId(childData);
    }

    return (
        <div className='rezept_erstellen__container'>
            <RezeptName recipeId={recipeId} parentCallback = {callbackFunction}>
            </RezeptName>
            <Collapse isOpened={recipeId !== null}>
                <div>Platzhalter für Zutaten und Text: {recipeId}</div>
            </Collapse>
        </div>
    )
}

export default RezeptErstellen;