import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Kochbuch.css'

import Rezept from './Rezept'

import useFetch from '../hooks/useFetch'

import search_zeichen from '../../images/search.png'
import erstellen_zeichen from '../../images/plus.png'

function Kochbuch() {

    // console.log('Kochbuch render')

    const [searchText, setSearchText] = useState('')

    const data = useFetch('get_recipes', 'Kochbuch');

    const items = data ? data.filter((x) => {
        if (!searchText)
            return x
        else if (x.name.toLowerCase().includes(searchText)) {
            return x
        }
        return null
    }).map(x => {
        return (
            <Rezept key={x.id} recipe={x}></Rezept>
        )
    }) : null

    const searchSpace = (e) => {
        let keyword = e.target.value;
        setSearchText(keyword.toLowerCase())
    }

    return (
        <div className="kochbuch__container">
            <div className="kochbuch__search">
                <div className="kochbuch__search_icon">
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
    )
}

export default Kochbuch
