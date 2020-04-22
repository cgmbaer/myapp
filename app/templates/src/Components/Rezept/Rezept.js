import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Rezept.css'
import image_placeholder from '../../images/imagePlaceholder.png'
import edit_bild from '../../images/edit.png'

const Rezept = (props) => {

    const [imagePath, setImagePath] = useState(image_placeholder)

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
            <div className="rezept__name">
                {props.recipe.name}
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