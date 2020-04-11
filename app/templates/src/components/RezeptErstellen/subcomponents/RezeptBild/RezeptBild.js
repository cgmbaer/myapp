import React, { useState, useEffect } from 'react';
import './RezeptBild.css';
import image_placeholder from '../../../../images/imagePlaceholder.png'
import photo_placeholder from '../../../../images/imagePlaceholder.png'

const RezeptBild = (props) => {

    const [recipeImage, setRecipeImage] = useState(image_placeholder);
    const [recipePhoto, setRecipePhoto] = useState(photo_placeholder);

    const onChange = async e => {
        if (e.target.files.length > 0) {
            let fd = new FormData()
            fd.append('recipeId', props.recipeId)
            fd.append('image', e.target.files[0])
            fd.append('imageType', e.target.id)
            let data = {}
            
            try {
                const response = await fetch('/recipe/api/v1.0/add_image', {
                // const response = await fetch('https://postman-echo.com/post', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    mode: 'no-cors',
                    body: fd
                })

                data = await response.json();
                console.log(data.filename);

                fd.get('imageType') === 'image-input' ?
                setRecipeImage('/images/' + data.filename + '?' + new Date().getTime()) :
                setRecipePhoto('/images/' + data.filename + '?' + new Date().getTime())
    
            } catch (error) {
                data = { 'error': error };
                console.log(data.error);

                fd.get('imageType') === 'image-input' ?
                setRecipeImage(URL.createObjectURL(fd.get('image'))) :
                setRecipePhoto(URL.createObjectURL(fd.get('image')))
            }
        }
    }

    useEffect(() => {
        if(props.has_image) { setRecipeImage('/images/' + props.recipeId + '.jpg') }
        if(props.has_photo) { setRecipePhoto('/images/' + props.recipeId + '_' + props.recipeId + '.jpg') }
    },[setRecipeImage, setRecipePhoto, props.has_image, props.has_photo, props.recipeId])

    return (
        <div className='rezept_bild__container'>
            <div className='rezept_text_bild__1_container'>
                <div className='rezept_text__1_container'>Foto vom Gericht</div>
                <div className='rezept_bild__1_container'>
                    <label htmlFor='image-input'>
                        <img src={recipeImage} alt='add' width='100%'></img>
                    </label>
                    <input hidden id='image-input' type='file' onChange={onChange}></input>
                </div>
            </div>
            <div className='rezept_bild__trenner'></div>
            <div className='rezept_text_bild__2_container'>
            <div className='rezept_text__2_container'>Rezept als Bild</div>
                <div className='rezept_bild__2_container'>
                    <label htmlFor='photo-input'>
                        <img src={recipePhoto} alt='add' width='100%'></img>
                    </label>
                    <input hidden id='photo-input' type='file' onChange={onChange}></input>
                </div>
            </div>
        </div>
    );
}

export default RezeptBild;