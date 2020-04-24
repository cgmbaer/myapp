import React, { useState, useRef, useEffect, useCallback } from 'react'
import './Listsearch.css'
import Alert from '../Alert/Alert'
import search_zeichen from '../../images/search.png';
import erstellen_zeichen from '../../images/plus.png';

const Listsearch = (props) => {

    const [searchText, setSearchText] = useState(null);
    const [message, setMessage] = useState(null);
    const [list, setList] = useState([]);

    const refItem = useRef()

    const searchSpace = (e) => {
        let keyword = e.target.value;
        setSearchText(keyword.toLowerCase())
    }

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({eType: eType, eMessage: eMessage}), 1)
    }

    const addItem = useCallback(async () => {

        let data = {}

        try {
            const response = await fetch('/recipe/api/v1.0/add_item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: props.type,
                    name: refItem.current.value,
                }),
            })
            if (response.status !== 200) { throw new Error("error") }
            data = await response.json()
            
            if(data.error){
                refreshMessage(1, data.error)
            } else {
                setList(data)
                refItem.current.value = null
                setSearchText(null)
                refreshMessage(2)
            }

        } catch (error) {
            refreshMessage(1)
        }
    },[props.type])

    const items = list.filter((x) => {
        if (searchText == null)
            return x
        else if (x.name.toLowerCase().includes(searchText)) {
            return x
        }
        return null
    }).map(x => {
        return (
            <div key={props.type + '-' + x.id}>{x.name}</div>
        )
    })

    useEffect(() => {
        addItem()
    }, [addItem])

    return (
        <div className="listsearch__container">
            {message ? <Alert message={message}></Alert> : null}
            <div className="listsearch__search">
                <div className="listsearch__search_icon">
                    <img src={search_zeichen} alt='add' height='50px'></img>
                </div>
                <div className="listsearch__search_text">
                    <input type='text' ref={refItem} onChange={(e) => searchSpace(e)} autoFocus={true}></input>
                </div>
                <div className="listsearch__erstellen_icon">
                    <img src={erstellen_zeichen} alt='add' height='50px' onClick={() => addItem()}></img>
                </div>
            </div>
            {items}
        </div>
    )
}

export default Listsearch