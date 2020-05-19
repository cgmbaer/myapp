import React, { useState, useEffect } from 'react'
import './Tag.css'

import { funFetch } from '../hooks/funFetch'

const Tag = (props) => {

    const [active, setActive] = useState(props.active)
    const [color, setColor] = useState('lightgrey')

    const handleTagClick = async () => {
        let body = {
            active: active,
            tagId: props.tagId,
            recipeId: props.recipeId,
        }

        funFetch('update_tag', body)
        setActive(!active)
    }

    useEffect(() => {
        active ? setColor('lightgreen') : setColor('lightgrey')
    }, [active])

    return (
        <div>
            <div className='tag__container' style={{ backgroundColor: color }} onClick={() => handleTagClick()}>
                {props.name}
            </div>
        </div>
    )
}

export default Tag;