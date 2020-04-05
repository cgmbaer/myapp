import React, { useState } from 'react';
import './RezeptName.css';
import { Collapse } from 'react-collapse';
import edit_bild from '../../../../images/edit.png'
import accept_bild from '../../../../images/accept.png'

const RezeptName = (props) => {

    const [rezeptId, setRezeptId] = useState(null);
    const [textInput, setTextInput] = useState('Bearbeiten und Titel ändern');
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const rezept_erstellen = async () => {

        const response = await fetch('/recipe/api/v1.0/add_recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ example: textInput }),
        });

        const resp_json = await response.json();
        setRezeptId(resp_json.example);

    }

    return (
        <div className='rezept_name__container'>
            <div className='rezept_name__ansicht_container'>
                <div className='rezept_name__text'>
                    {textInput}
                </div>
                <div className='rezept_name__edit' onClick={toggle}>
                    <img src={edit_bild} alt='edit' height='100%'></img>
                </div>
            </div>
            <Collapse isOpened={isOpen}>
                <div className='rezept_name__edit_container'>
                    <input className='rezept_name__input' type='text' onChange={event => setTextInput(event.target.value)}></input>
                    <div className='rezept_name__accept' onClick={rezept_erstellen}>
                        <img src={accept_bild} alt='edit' height='100%'></img>
                    </div>
                </div>
            </Collapse>
            <hr />
        </div>
    )
}

export default RezeptName;