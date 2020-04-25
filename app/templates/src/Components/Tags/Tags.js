import React, { useState, useEffect } from 'react'
import './Tags.css'
import Alert from '../Alert/Alert'
import Tag from '../Tag/Tag'

const Tags = (props) => {

    const [message, setMessage] = useState(null);
    const [allTags, setAllTags] = useState([]);

    const tags = [
        {tagId: 2, name: 'schnell zubereitet'},
        {tagId: 5, name: 'Schmorgericht'},
    ]

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({ eType: eType, eMessage: eMessage }), 1)
    }

    const items = allTags.map(
        x => {
            return(
                <Tag
                    key={'Create-Tags' + x.tagId}
                    tagId={x.id}
                    name={x.name}
                    recipeId={3}
                    active={tags.map(y => y['tagId']).includes(x.id)}>
                </Tag>
            )
        }
    )

    useEffect(() => {
        let mounted = true;
        let data = {}
        async function fetchData() {
            try {
                const response = await fetch('/recipe/api/v1.0/add_item', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'Tag',
                        name: '',
                    }),
                })
                if (mounted) {
                    if (response.status !== 200) { throw new Error("error") }
                    data = await response.json()
                    setAllTags(data)
                    refreshMessage(2)
                }
            } catch (error) {
                if (mounted) {
                    refreshMessage(1)
                }
            }
        }
        fetchData()
        return () => { mounted = false };
    }, []);

    return (
        <div className='tags__container'>
            {message ? <Alert message={message}></Alert> : null}
            {items}
        </div>
    )
}

export default Tags;