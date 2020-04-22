import React from 'react';
import './Toolbar.css';
import { NavLink } from 'react-router-dom';
import kochbuch_zeichen from '../../images/rezepte.png';
import einkauf_zeichen from '../../images/shopping.png';
import einstellungen_zeichen from '../../images/settings.png';

const Toolbar = (props) => {
    return (
        <div className="toolbar__container">
            <nav className="toolbar__navigation"></nav>
            <ul>
                <li><NavLink activeClassName="toolbar__active" exact to={{ pathname: "/", state: {} }}>
                    <img src={kochbuch_zeichen} alt='add' height='50px'></img>
                </NavLink></li>
                <li><NavLink activeClassName="toolbar__active" to={{ pathname: "/Einkauf", state: {} }}>
                    <img src={einkauf_zeichen} alt='add' height='50px'></img>
                </NavLink></li>
                <li><NavLink activeClassName="toolbar__active" to={{ pathname: "/Einstellungen", state: {} }}>
                    <img src={einstellungen_zeichen} alt='add' height='50px'></img>
                </NavLink></li>
            </ul>
        </div>
    )
}

export default Toolbar;