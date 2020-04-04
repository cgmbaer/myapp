import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Toolbar.css';
import plus_zeichen from './plus.png';
import home_zeichen from './home.svg';
import { Collapse } from 'react-collapse';

const Toolbar = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [textInput, setTextInput] = useState('')

    const history = useHistory();

    const rezept_erstellen = async () => {

        const response = await fetch('/recipe/api/v1.0/add_recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ example: textInput }),
        })

        console.log(await response.json())

        history.push("/RezeptErstellen");
        setIsOpen(!isOpen);
    }

    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div></div>
                <div className="toolbar__logo">
                    <NavLink exact to="/">
                        <img src={home_zeichen} alt='add' height='100%'></img>
                    </NavLink>
                </div>
                <NavLink className='toolbar__item' exact to="/Rezept">Rezept</NavLink>
                <NavLink className='toolbar__item' to="/Einkauf/">Einkauf</NavLink>
                <NavLink className='toolbar__item' to="/RezeptErstellen/">Neu</NavLink>
                <div className='toolbar__plus_zeichen' onClick={toggle}>
                    <img src={plus_zeichen} alt='add' height='100%'></img>
                </div>
            </nav>
            <Collapse isOpened={isOpen}>
                <div className='neues_rezept__container'>
                    <div className='rezept_name__container'>
                        <div className='rezept_name__text'>
                            <input className='rezept_name__input' type='text' onChange={event => setTextInput(event.target.value)}></input>
                        </div>
                        <div className='rezept_name__button' onClick={rezept_erstellen}>
                            Erstellen
                        </div>
                    </div>
                </div>
            </Collapse>
        </header>
    );
}

export default Toolbar;