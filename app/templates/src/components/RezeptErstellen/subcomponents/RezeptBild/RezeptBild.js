import React, { useState } from 'react';
import './RezeptBild.css';
import image_placeholder from '../../../../images/imagePlaceholder.jpg'

const RezeptBild = (props) => {

    const [recipeImage, setRecipeImage] = useState(image_placeholder);

    const onChange = e => {
        if (e.target.files.length > 0) {
            setRecipeImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div className='rezept_bild__container'>
            <label htmlFor='file-input'>
                <img src={recipeImage} alt='add' height='180px' width='100%'></img>
            </label>
            <input hidden id='file-input' type='file' onChange={onChange}></input>
        </div>
    );
}

export default RezeptBild;