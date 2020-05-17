import React, { useState, useRef } from 'react'
import './Listsearch.css'

import Listitem from './Listitem'
import Dropdown from '../Dropdown/Dropdown'

import { funFetch } from '../hooks/funFetch'

import search_zeichen from '../../images/search.png'
import erstellen_zeichen from '../../images/plus.png'

const Listsearch = (props) => {

    const [searchText, setSearchText] = useState(null);
    const [openCategory, setOpenCategory] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState(props.items);

    const refItem = useRef()

    const searchSpace = (e) => {
        let keyword = e.target.value;
        setSearchText(keyword.toLowerCase())
    }

    const addItem = async (id) => {
        let body = {
            type: props.type,
            name: refItem.current.value,
        }

        if(id) body['categoryId'] = id

        let data = await funFetch('add_item', body)

        setItems([...items, data])
        refItem.current.value = ''
        setSearchText(null)
    }

    const listItems = items ? items.filter((x) => {
        if (searchText == null)
            return x
        else if (x.name.toLowerCase().includes(searchText)) {
            return x
        }
        return null
    }).map(x => {
        return (
            <Listitem key={props.type + '-' + x.id} id={x.id} name={x.name} type={props.type} categories={props.categories} />
        )
    }) : null

    const handleCategoryStatus = () => {
        if (props.categories) {
            setOpenCategory(true)
        } else {
            addItem(null)
        }
    }

    const handleCategoryClick = (id, name) => {
        setOpenCategory(false)
        addItem(id)
    }

    return (
        <div className="listsearch__container">
            <div className="listsearch__name" onClick={() => { setIsOpen(!isOpen) }}>{props.name}</div>
            {isOpen ? (
                <div>
                    <div className="listsearch__search">
                        <div className="listsearch__search_icon">
                            <img src={search_zeichen} alt='add' height='40px'></img>
                        </div>
                        <div className="listsearch__search_text">
                            <input type='text' ref={refItem} onChange={(e) => searchSpace(e)}></input>
                            {openCategory ? (
                                <Dropdown items={props.categories} callback={handleCategoryClick} />
                            ) : null}
                        </div>
                        <div className="listsearch__erstellen_icon">
                            <img src={erstellen_zeichen} alt='add' height='40px' onClick={() => handleCategoryStatus()}></img>
                        </div>
                    </div>
                    {listItems}
                </div>
            ) : (
                    null
                )}
        </div>
    )
}

export default Listsearch