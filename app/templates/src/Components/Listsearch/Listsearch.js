import React, { useState, useRef } from 'react'
import './Listsearch.css'
import Alert from '../Alert/Alert'
import Listitem from '../Listitem/Listitem'
import search_zeichen from '../../images/search.png';
import erstellen_zeichen from '../../images/plus.png';

const Listsearch = (props) => {

    const [searchText, setSearchText] = useState(null);
    const [message, setMessage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [list, setList] = useState([]);

    const refItem = useRef()

    const searchSpace = (e) => {
        let keyword = e.target.value;
        setSearchText(keyword.toLowerCase())
    }

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

    const getItems = () => {
        if(isOpen) {
            setIsOpen(!isOpen)
        } else {
            addItem()
            setIsOpen(!isOpen)
        }
    }

    const addItem = async () => {

        let data = {}
        let name = ''
        isOpen ? name = refItem.current.value : name = ''

        try {
            const response = await fetch('/recipe/api/v1.0/add_item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: props.type,
                    name: name,
                }),
            })

            if (response.status !== 200) { throw new Error("error") }
            data = await response.json()

            if (data.error) {
                refreshMessage(1, data.error)
            } else {
                setList(data)
                if(isOpen) {
                    refItem.current.value = null
                    setSearchText(null)
                }
                refreshMessage(2)
            }

        } catch (error) {
            refreshMessage(1)
            setList([{ id: '1', name: 'Test1' }, { id: '2', name: 'Test2' }])
        }
    }

    const items = list.filter((x) => {
        if (searchText == null)
            return x
        else if (x.name.toLowerCase().includes(searchText)) {
            return x
        }
        return null
    }).map(x => {
        return (
            <Listitem key={props.type + '-' + x.id} id={x.id} name={x.name} type={props.type}/>
        )
    })

    return (
        <div className="listsearch__container">
            {message ? <Alert message={message}></Alert> : null}
            <div className="listsearch__name" onClick={() => getItems()}>{props.name}</div>
            {isOpen ? (
                <div>
                    <div className="listsearch__search">
                        <div className="listsearch__search_icon">
                            <img src={search_zeichen} alt='add' height='40px'></img>
                        </div>
                        <div className="listsearch__search_text">
                            <input type='text' ref={refItem} onChange={(e) => searchSpace(e)}></input>
                        </div>
                        <div className="listsearch__erstellen_icon">
                            <img src={erstellen_zeichen} alt='add' height='40px' onClick={() => addItem()}></img>
                        </div>
                    </div>
                    {items}
                </div>
            ) : (
                    null
                )}
        </div>
    )
}

export default Listsearch