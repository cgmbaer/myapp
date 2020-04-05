import React, { useState } from 'react';
import './RezeptErstellen.css'
import { Collapse } from 'react-collapse';
import RezeptName from './subcomponents/RezeptName/RezeptName'

const RezeptErstellen = (props) => {

    const rezeptId = 'asdf';

    return (
        <div className='rezept_erstellen__container'>
            <RezeptName>

            </RezeptName>
            <Collapse isOpened={rezeptId !== null}>
                <div>Platzhalter für Zutaten und Text: {rezeptId}</div>
            </Collapse>
        </div>
    )
}

export default RezeptErstellen;