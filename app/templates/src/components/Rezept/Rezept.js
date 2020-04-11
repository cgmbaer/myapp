import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Rezept.css'
import test_bild from '../../images/3.jpg'
import edit_bild from '../../images/edit.png';
import image_placeholder from '../../images/imagePlaceholder.png'

const Rezept = (props) => {

    const [imagePath, setImagePath] = useState(image_placeholder)

    useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            setImagePath(test_bild)
        } else {
            try {
                if(props.recipe.has_image) { setImagePath('/images/' + props.recipe.id + '.jpg') };
            }
            catch (err) {
                console.log('failed')
            }
        }
    }, [props.recipe]);

    return (
        <div className='rezept__container'>
            <div className='rezept__bild_container'>
                <img className='rezept__bild' alt='recipe' src={imagePath} height='75px'></img>
            </div>
            <div className='rezept__name_container'>
                {props.recipe.name}
            </div>
            <Link to={{pathname: '/RezeptErstellen', state: props.recipe}}>
                <div className='rezept__edit_container'>
                    <img className='rezept__edit' alt='edit' src={edit_bild} height='25px'></img>
                </div>
            </Link>
        </div>
    )
}

export default Rezept