import React from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.css';
import plus_zeichen from '../../images/plus.png';
import home_zeichen from '../../images/home.svg';

const Toolbar = (props) => {

    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__logo">
                    <NavLink exact to="/">
                        <img src={home_zeichen} alt='add' height='100%' width='100%'></img>
                    </NavLink>
                </div>
                <NavLink className='toolbar__item' exact to="/Rezept">Rezept</NavLink>
                <NavLink className='toolbar__item' to="/Einkauf">Einkauf</NavLink>
                <NavLink className='toolbar__item' to="/RezeptErstellen">Neu</NavLink>
                <div className='toolbar__plus_zeichen'>
                    <NavLink exact to="/RezeptErstellen">
                        <img src={plus_zeichen} alt='add' height='100%' width='100%'></img>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Toolbar;