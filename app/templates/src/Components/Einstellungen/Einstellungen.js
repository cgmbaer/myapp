import React from 'react'
import './Einstellungen.css'
import Listsearch from '../Listsearch/Listsearch'

const Einstellungen = (props) => {
    return (
        <div className="einstellungen__container">
            <div className="einstellungen__tags_container">
                Tags:
                <Listsearch type='Tag'></Listsearch>
            </div>
            <div className="einstellungen__ingredient_container">
                Zutaten:
                <Listsearch type='Ingredient'></Listsearch>
            </div>
        </div>
    )
}

export default Einstellungen