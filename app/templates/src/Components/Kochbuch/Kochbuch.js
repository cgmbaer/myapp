import React, { useState, useEffect } from 'react';
import './Kochbuch.css';
import Alert from '../Alert/Alert'
import Rezept from '../Rezept/Rezept'
import { Link } from 'react-router-dom';
import search_zeichen from '../../images/search.png';
import erstellen_zeichen from '../../images/plus.png';

function Kochbuch() {

    const [recipes, setRecipes] = useState([]);
    const [searchText, setSearchText] = useState(null);
    const [message, setMessage] = useState(null);

    const searchSpace = (e) => {
        let keyword = e.target.value;
        setSearchText(keyword.toLowerCase())
    }

    const items = recipes.filter((x) => {
        if (searchText == null)
            return x
        else if (x.name.toLowerCase().includes(searchText)) {
            return x
        }
        return null
    }).map(x => {
        return (
            <Rezept key={x.id} recipe={x}></Rezept>
        )
    })

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({eType: eType, eMessage: eMessage}), 1)
    }

    useEffect(() => {
        let mounted = true;
        let data = {}
        async function fetchData() {
            try {
                const response = await fetch('/recipe/api/v1.0/get_recipes', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                })
                if (mounted) {
                    if (response.status !== 200) { throw new Error("error") }
                    data = await response.json()
                    setRecipes(data)
                    refreshMessage(2)
                }
            } catch (error) {
                if (mounted) {
                    setRecipes([
                        {"name":"Rindertatar","quantity":null,"image_filename":null,"photo_filename":null,"tags":[{"tag_id":2,"name":"Nudelgericht"},{"tag_id":3,"name":"Nudelgericht"},{"tag_id":4,"name":"Nudelgericht"},{"tag_id":5,"name":"Nudelgericht"},{"tag_id":6,"name":"Nudelgericht"}],"id":1},
                        {"name":"French Toast","quantity":null,"image_filename":null,"photo_filename":null,"tags":null,"id":2}
                    ])
                    refreshMessage(1)
                }
            }
        }
        fetchData()
        return () => { mounted = false };
    }, []);

    return (
        <div className="kochbuch__container">
            {message ? <Alert message={message}></Alert> : null}
            <div className="kochbuch__search">
                <div className="kochbuch__search_icon" onClick={() => refreshMessage(2)}>
                    <img src={search_zeichen} alt='add' height='50px'></img>
                </div>
                <div className="kochbuch__search_text">
                    <input type='text' onChange={(e) => searchSpace(e)}></input>
                </div>
                <Link to={{ pathname: '/Erstellen', state: {} }}>
                    <div className="kochbuch__erstellen_icon">
                        <img src={erstellen_zeichen} alt='add' height='50px'></img>
                    </div>
                </Link>
            </div>
            <div className='kochbuch__rezept_container'>
                {items}
            </div>
        </div>
    );
}

export default Kochbuch;
