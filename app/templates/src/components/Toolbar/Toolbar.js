import React from 'react';
import {NavLink} from 'react-router-dom';
import './Toolbar.css'

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div></div>
            <div className="toolbar__logo">
                <a href="/">THE LOGO</a>
            </div>
            <div className="toolbar__navigation-items">
                <ul>
                    <li><NavLink exact to="/">Rezept</NavLink></li>
                    <li><NavLink to="/Einkauf/">Einkauf</NavLink></li>
                    <li><NavLink to="/RezeptErstellen/">Rezept Erstellen</NavLink></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;