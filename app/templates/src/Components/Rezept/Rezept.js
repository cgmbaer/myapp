import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Rezept.css'
import image_placeholder from '../../images/imagePlaceholder.png'
import edit_bild from '../../images/edit.png'

const Rezept = (props) => {

    const [imagePath, setImagePath] = useState(image_placeholder)

    const items = props.recipe.tags ? props.recipe.tags.map(
        x => {
            return (
                <div className="rezept__tag_items">{x.name}</div>
            )
        }
    ) : null

    useEffect(() => {
        if (props.recipe.image_filename) {
            setImagePath(props.recipe.image_filename)
        };
    }, [props.recipe]);

    return (
        <div className="rezept__container">
            <div className="rezept__thumbnail">
                <img src={imagePath} alt='add' height='80px'></img>
            </div>
            <div className="rezept__name_tags">
                <div className="rezept__name">
                    <div>{props.recipe.name}</div>
                </div>
                <div className="rezept__tags">
                    {items}
                </div>
            </div>
            <Link to={{ pathname: '/Erstellen', state: props.recipe }}>
                <div className="rezept__edit">
                    <img src={edit_bild} alt='edit' height='40px'></img>
                </div>
            </Link>
        </div>
    )
}

export default Rezept;