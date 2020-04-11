import React from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.css';
import home_zeichen from '../../images/home.png';
import kochbuch_zeichen from '../../images/rezepte.png';
import einkauf_zeichen from '../../images/shopping.png';
import plus_zeichen from '../../images/plus.png';

const Toolbar = (props) => {

    return (
        <header className="toolbar__container">
            <nav className="toolbar__navigation">
                <ul className="toolbar__list">
                    <li><NavLink activeClassName="toolbar__active" exact to="/">
                        <img src={home_zeichen} alt='add' height='50px'></img>
                    </NavLink></li>
                    <li><NavLink activeClassName="toolbar__active" to="/Kochbuch">
                        <img src={kochbuch_zeichen} alt='add' height='50px'></img>
                    </NavLink></li>
                    <li><NavLink activeClassName="toolbar__active" to="/Einkauf">
                        <img src={einkauf_zeichen} alt='add' height='50px'></img>
                    </NavLink></li>
                    <li><NavLink activeClassName="toolbar__active" to={{pathname: "/RezeptErstellen", state: {} }}>
                        <img src={plus_zeichen} alt='add' height='50px'></img>
                    </NavLink></li>
                    </ul>
            </nav>
        </header>
    );
}

export default Toolbar;