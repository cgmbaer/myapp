import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import './Rezept.css'

import { funFetch } from '../hooks/funFetch'

import image_placeholder from '../../images/imagePlaceholder.jpg'
import edit_bild from '../../images/edit.png'
import shopping_bild from '../../images/shopping.png'

const Rezept = (props) => {

    const [imagePath, setImagePath] = useState(image_placeholder)
    const [photoPath, setPhotoPath] = useState(image_placeholder)
    const [maxHeight, setMaxHeight] = useState(null)

    const items = props.recipe.tags ? props.recipe.tags.map(
        x => {
            return (
                <div key={'rezept_tags-' + x.tag_id} className="rezept__tag_items">{x.name}</div>
            )
        }
    ) : null

    const collapseCotainer = useRef()

    const collapse = () => {
        if (maxHeight) {
            setMaxHeight(null);
        } else {
            setMaxHeight(collapseCotainer.current.scrollHeight + "px");
        }
    }

    const mHelper = (text) => {
        if (text) {
            var bold = /\*\*(.*?)\*\*/gm
            var html = text.replace(bold, '<strong>$1</strong>')
            return html
        }
    }

    const handleShoppingClick = () => {
        funFetch('edit_shopping',
            JSON.stringify({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipeId: props.recipe.id
                }),
            })
        )
    }

    useEffect(() => {
        if (props.recipe.image_filename) {
            setImagePath(props.recipe.image_filename)
        }
        if (props.recipe.photo_filename) {
            setPhotoPath(props.recipe.photo_filename)
        }
    }, [props.recipe]);

    return (
        <div className="rezept__container">
            <div className="rezept__preview_container">
                <div className="rezept__thumbnail" onClick={() => collapse()}>
                    <img src={imagePath} alt='add' height='90px'></img>
                </div>
                <div className="rezept__name_tags">
                    <div className="rezept__name">
                        <div className='rezept__text'>{props.recipe.name}</div>
                        <div className="rezept__shopping" onClick={() => handleShoppingClick()}>
                            <img src={shopping_bild} alt='add' height='30px'></img>
                        </div>
                    </div>
                    <div className="rezept__tags">
                        {items}
                    </div>
                </div>
            </div>
            <div className="rezept__show_container" ref={collapseCotainer} style={{ maxHeight: maxHeight }}>
                <div className="rezept__show_ingredients">
                    {
                        props.recipe.ingredients ? props.recipe.ingredients.map(x => {
                            return (
                                <div className="rezept__group_container" key={'show-group-' + x.group}>
                                    <div className="rezept__group_text">{x.group}</div>
                                    {
                                        x.items.map(y => {
                                            return (
                                                <div className="rezept__table_container" key={'show-item-' + x.group + y.id}>
                                                    <div className="rezept__table_quantity">{y.quantity}</div>
                                                    <div className="rezept__table_unit">{y.unit}</div>
                                                    <div className="rezept__table_ingredient">{y.ingredient}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }) : (
                                <div className="rezept__photo">
                                    <img src={photoPath} alt='add' width='100%'></img>
                                </div>
                            )
                    }
                </div>
                <div className="rezept__show_text_container">
                    <div className="rezept__show_text" dangerouslySetInnerHTML={{ __html: mHelper(props.recipe.description) }} />
                </div>
                <Link to={{ pathname: '/Erstellen', state: props.recipe }}>
                    <div className="rezept__edit">
                        <img src={edit_bild} alt='edit' height='30px'></img>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Rezept;