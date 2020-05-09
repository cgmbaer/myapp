import React from 'react'
import './Tags.css'
import Tag from '../Tag/Tag'

const Tags = (props) => {

    const items = props.items ? props.items.map(
        x => {
            return(
                <Tag
                    key={'Create-Tags' + x.tagId}
                    tagId={x.id}
                    name={x.name}
                    recipeId={props.recipeId}
                    active={props.tags ? props.tags.map(y => y['tag_id']).includes(x.id) : false}>
                </Tag>
            )
        }
    ) : null

    return (
        <div className='tags__container'>
            {items}
        </div>
    )
}

export default Tags;