import React from 'react'
import './Einstellungen.css'

import Listsearch from './Listsearch'
import Unit from './Unit'

import useFetch from '../hooks/useFetch'

const Einstellungen = (props) => {

    const data = useFetch('get_items', 'Items');

    return (
        <div className="einstellungen__container">
            {data ? <div>
                <div className="einstellungen__ingredient_container">
                    <Listsearch type='Ingredient' items={data.ingredient} categories={data.category} name='Zutaten'></Listsearch>
                </div>
                <div className="einstellungen__tags_container">
                    <Listsearch type='Tag' items={data.tag} name='Tags'></Listsearch>
                </div>
                <div className="einstellungen__unit_container">
                    <Unit type='Unit' items={data.unit} name='Einheiten'/>
                </div>
                <div className="einstellungen__category_container">
                    <Listsearch type='Category' items={data.category} name='Kategorie'></Listsearch>
                </div>
            </div> : null}
        </div>
    )
}

export default Einstellungen