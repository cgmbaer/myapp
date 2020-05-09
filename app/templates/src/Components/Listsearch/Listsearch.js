import React, { useState, useRef } from 'react'
import './Listsearch.css'
import Alert from '../Alert/Alert'
import Listitem from '../Listitem/Listitem'
import search_zeichen from '../../images/search.png'
import erstellen_zeichen from '../../images/plus.png'
import Dropdown from '../Dropdown/Dropdown'

const Listsearch = (props) => {

    const [searchText, setSearchText] = useState(null);
    const [openCategory, setOpenCategory] = useState(false);
    const [message, setMessage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState(props.items);

    const refItem = useRef()

    const searchSpace = (e) => {
        let keyword = e.target.value;
        setSearchText(keyword.toLowerCase())
    }

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

    const addItem = async (id) => {

        let data = {}

        let body = {
            type: props.type,
            name: refItem.current.value,
        }

        if(id) body['categoryId'] = id

        try {
            const response = await fetch('/recipe/api/v1.0/add_item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            if (response.status !== 200) { throw new Error("error") }
            data = await response.json()

            if (data.error) {
                refreshMessage(1, data.error)
            } else {
                setItems([...items, data])
                refItem.current.value = ''
                setSearchText(null)
                refreshMessage(2)
            }

        } catch (error) {
            setItems([...items, { 'id': 10, 'name': 'Chili', 'category_id': null }])
            refItem.current.value = ''
            setSearchText(null)
            refreshMessage(1)
        }

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
            {message ? <Alert message={message}></Alert> : null}
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