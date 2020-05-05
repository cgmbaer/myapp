import React, { useState, useEffect } from 'react'
import './Einstellungen.css'
import Listsearch from '../Listsearch/Listsearch'
import Alert from '../Alert/Alert'

const Einstellungen = (props) => {

    const [message, setMessage] = useState(null);
    const [items, setItems] = useState(null);

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

    useEffect(() => {
        let mounted = true;
        let data = {}
        async function fetchData() {
            try {
                const response = await fetch('/recipe/api/v1.0/get_items', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                })
                if (mounted) {
                    if (response.status !== 200) { throw new Error("error") }
                    data = await response.json()
                    setItems(data)
                    refreshMessage(2)
                }
            } catch (error) {
                if (mounted) {
                    setItems({
                        "category": [{ "id": 1, "name": "Obst & Gem\u00fcse" }, { "id": 2, "name": "Brot" }, { "id": 3, "name": "Milchprodukte" }],
                        "ingredient": [{ "category_id": null, "id": 1, "name": "Butter" }],
                        "tag": [{ "id": 1, "name": "vegetarisch" }],
                        "unit": [{ "id": 1, "name": "gr" }]
                    })
                    refreshMessage(1)
                }
            }
        }
        fetchData()
        return () => { mounted = false };
    }, []);

    return (
        <div className="einstellungen__container">
            {message ? <Alert message={message}></Alert> : null}
            {items ? <div> <div className="einstellungen__ingredient_container">
                <Listsearch type='Ingredient' items={items.ingredient} categories={items.category} name='Zutaten'></Listsearch>
            </div>
                <div className="einstellungen__tags_container">
                    <Listsearch type='Tag' items={items.tag} name='Tags'></Listsearch>
                </div>
                <div className="einstellungen__unit_container">
                    <Listsearch type='Unit' items={items.unit} name='Einheiten'></Listsearch>
                </div>
                <div className="einstellungen__category_container">
                    <Listsearch type='Category' items={items.category} name='Kategorie'></Listsearch>
                </div>
            </div> : null}
        </div>
    )
}

export default Einstellungen