import React, { useState } from 'react'
import './Listitem.css'
import edit_bild from '../../images/edit.png'
import save_bild from '../../images/save.png'


const Listitem = (props) => {
    const [editable, setEditable] = useState(false)
    const [name, setName] = useState(props.name)

    return (
        <div className="listitem__container">
            {
                !editable ? (
                    <div>
                        <div className="listitem__text">
                            {name}
                        </div>
                        <div className="listitem__edit">
                            <img src={edit_bild} alt='edit' height='40px' onClick={() => setEditable(true)}></img>
                        </div>
                    </div>
                ) : (
                        <div>
                            <div className="listitem__text">
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="listitem__accept">
                                <img src={save_bild} alt='edit' height='40px' onClick={() => setEditable(false)}></img>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Listitem