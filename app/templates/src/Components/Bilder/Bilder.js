import React, { useState } from 'react'
import './Bilder.css';
import image_placeholder from '../../images/imagePlaceholder.png'
import Alert from '../Alert/Alert'

const Bilder = (props) => {

    const [recipeImage, setRecipeImage] = useState(props.imageFilename || image_placeholder);
    const [recipePhoto, setRecipePhoto] = useState(props.photoFilename || image_placeholder);
    const [message, setMessage] = useState(null);

    const refreshMessage = (eType, eMessage = null) => {
        setMessage(null)
        setTimeout(() => setMessage({eType: eType, eMessage: eMessage}), 1)
    }

    const onChange = async e => {
        if (e.target.files.length > 0) {
            let fd = new FormData()
            fd.append('recipeId', props.recipeId)
            fd.append('image', e.target.files[0])
            fd.append('imageType', e.target.id)
            let data = {}

            try {
                const response = await fetch('/recipe/api/v1.0/add_image', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    mode: 'no-cors',
                    body: fd
                })

                if (response.status !== 200) { throw new Error("error") }
                data = await response.json();
                let filepath = data.filename + '?' + new Date().getTime(); 
                fd.get('imageType') === 'image-input' ? setRecipeImage(filepath) : setRecipePhoto(filepath)
                refreshMessage(2)
            } catch (error) {
                refreshMessage(1)
            }
        }
    }

    return (
        <div className='rezept_bild__container'>
            {message ? <Alert message={message}></Alert> : null}
            <div className='rezept_text_bild__container'>
                Foto vom Gericht
                <div className='rezept_bild__container'>
                    <label htmlFor='image-input'>
                        <img src={recipeImage} alt='add' width='160px'></img>
                    </label>
                    <input hidden id='image-input' type='file' onChange={onChange}></input>
                </div>
            </div>
            <div className='rezept_bild__trenner'></div>
            <div className='rezept_text_bild__container'>
                Rezept als Bild
                <div className='rezept_bild__container'>
                    <label htmlFor='photo-input'>
                        <img src={recipePhoto} alt='add' width='160px'></img>
                    </label>
                    <input hidden id='photo-input' type='file' onChange={onChange}></input>
                </div>
            </div>
        </div>
    )
}

export default Bilder;