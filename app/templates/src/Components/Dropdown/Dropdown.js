import React, { useState } from 'react'
import './Dropdown.css'
import search_bild from '../../images/search.png';

const Dropdown = (props) => {

    const [search, setSeach] = useState('')

    const itemList = props.items ? props.items.filter(
        x => x.name.toLowerCase().includes(
            search.toLowerCase()
        )
    ).map((x) => {
        return (
            <div
                className='dropdown__item'
                key={x.name + x.id}
                onClick={(e) => props.callback(x.id, x.name)}
            >
                {x.name}
            </div>
        )
    }) : null

    return (
        <div>
            <div className='dropdown__container'>
                <div className='dropdown__search_container'>
                    <input type='text' value={search} onChange={(e) => setSeach(e.target.value)} autoFocus={true} />
                    <div className='dropdown__search_bild'>
                        <img src={search_bild} alt='save' height='25px'></img>
                    </div>
                </div>
                <div className='dropdown__item_container'>
                    {itemList}
                </div>
            </div>
        </div>
    )
}

export default Dropdown
