import React from 'react';
import './Kochbuch.css';

import useFetch from '../Hooks/useFetch'


function Kochbuch() {

    const res = useFetch('get_recipes', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'no-cors'
    });

    if (!res.response) {
        return <div>Loading...</div>
    }

    const recipes = res.response

    return (
        <div className="kochbuch__container">
            worked
        </div>
    );
}

export default Kochbuch;
