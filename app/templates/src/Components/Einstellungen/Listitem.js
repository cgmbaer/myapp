import React, { useState, useRef } from 'react'
import './Listitem.css'

import Dropdown from '../Dropdown/Dropdown'

import { funFetch } from '../hooks/funFetch'

import edit_bild from '../../images/edit.png'
import save_bild from '../../images/save.png'

const Listitem = (props) => {
    const [editable, setEditable] = useState(false)
    const [name, setName] = useState(props.name)
    const [color, setColor] = useState(null)
    const [openCategory, setOpenCategory] = useState(false);
    const [categoryId, setCategoryId] = useState(props.category_id || null)

    const refItem = useRef();

    const updateItem = () => {

        let body = {
            type: props.type,
            id: props.id,
            name: name,
        }

        if (categoryId) body['categoryId'] = categoryId

        funFetch('add_item', body)

        setEditable(false)
        setColor(null)
    }

    const handleStatus = () => {
        setEditable(true)
        if (props.categories) {
            setOpenCategory(true)
        }
    }

    const handleCategoryClick = (id, name) => {
        setOpenCategory(false)
        setColor('rgb(235, 162, 162)')
        setCategoryId(id)
    }

    return (
        <div>
            {
                !editable ? (
                    <div className="listitem__container">
                        <div className="listitem__text">
                            {name}
                        </div>
                        <div className="listitem__button">
                            <img src={edit_bild} alt='edit' height='30px' onClick={() => handleStatus()}></img>
                        </div>
                    </div>
                ) : (
                        <div className="listitem__container" style={{ backgroundColor: color }}>
                            <div className="listitem__text">
                                <input type='text' value={name} onChange={(e) => { setName(e.target.value); setColor('rgb(235, 162, 162)') }} autoFocus={true} ref={refItem} />
                                {openCategory ? (
                                    <Dropdown items={props.categories} callback={handleCategoryClick} />
                                ) : null}
                            </div>
                            <div className="listitem__button">
                                <img src={save_bild} alt='edit' height='30px' onClick={() => updateItem()}></img>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Listitem