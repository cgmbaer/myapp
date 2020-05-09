import React, { useState, useRef } from 'react'
import './Listitem.css'
import edit_bild from '../../images/edit.png'
import save_bild from '../../images/save.png'
import Alert from '../Alert/Alert'
import Dropdown from '../Dropdown/Dropdown'

const Listitem = (props) => {
    const [editable, setEditable] = useState(false)
    const [message, setMessage] = useState(null)
    const [name, setName] = useState(props.name)
    const [color, setColor] = useState(null)
    const [openCategory, setOpenCategory] = useState(false);
    const [categoryId, setCategoryId] = useState(props.category_id || null)

    const refItem = useRef();

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

    const updateItem = async () => {

        let data = {}

        let body = {
            type: props.type,
            id: props.id,
            name: name,
        }

        if (categoryId) body['categoryId'] = categoryId

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
                setEditable(false)
                setColor(null)
                refreshMessage(2)
            }

        } catch (error) {
            setEditable(false)
            setColor(null)
            refreshMessage(1)
        }
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
            {message ? <Alert message={message}></Alert> : null}
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