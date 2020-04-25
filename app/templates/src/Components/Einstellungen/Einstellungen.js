import React from 'react'
import './Einstellungen.css'
import Listsearch from '../Listsearch/Listsearch'

const Einstellungen = (props) => {
    return (
        <div className="einstellungen__container">
            <div className="einstellungen__ingredient_container">
                <Listsearch type='Ingredient' name='Zutaten'></Listsearch>
            </div>
            <div className="einstellungen__tags_container">
                <Listsearch type='Tag' name='Tags'></Listsearch>
            </div>
            <div className="einstellungen__unit_container">
                <Listsearch type='Unit' name='Units'></Listsearch>
            </div>
            <div className="einstellungen__category_container">
                <Listsearch type='Category' name='Kategorie'></Listsearch>
            </div>
        </div>
    )
}

export default Einstellungen