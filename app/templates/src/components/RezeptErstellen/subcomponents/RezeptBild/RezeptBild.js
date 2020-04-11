import React, { useState } from 'react';
import './RezeptBild.css';
import image_placeholder from '../../../../images/imagePlaceholder.png'
import photo_placeholder from '../../../../images/imagePlaceholder.png'

const RezeptBild = (props) => {

    const [recipeImage, setRecipeImage] = useState(image_placeholder);
    const [recipePhoto, setRecipePhoto] = useState(photo_placeholder);

    const onChangeImage = e => {
        if (e.target.files.length > 0) {
            setRecipeImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const onChangePhoto = e => {
        if (e.target.files.length > 0) {
            setRecipePhoto(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div className='rezept_bild__container'>
            <div className='rezept_text_bild__1_container'>
                Foto vom Gericht
                <div className='rezept_bild__1_container'>
                    <label htmlFor='image-input'>
                        <img src={recipeImage} alt='add' width='100%'></img>
                    </label>
                    <input hidden id='image-input' type='file' onChange={onChangeImage}></input>
                </div>
            </div>
            <div className='rezept_text_bild__2_container'>
                Rezept als Bild
                <div className='rezept_bild__2_container'>
                    <label htmlFor='photo-input'>
                        <img src={recipePhoto} alt='add' width='100%'></img>
                    </label>
                    <input hidden id='photo-input' type='file' onChange={onChangePhoto}></input>
                </div>
            </div>
        </div>
    );
}

export default RezeptBild;