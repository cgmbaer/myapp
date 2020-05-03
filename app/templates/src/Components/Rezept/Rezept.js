import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import './Rezept.css'
import image_placeholder from '../../images/imagePlaceholder.jpg'
import edit_bild from '../../images/edit.png'

const Rezept = (props) => {

    const [imagePath, setImagePath] = useState(image_placeholder)
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

    useEffect(() => {
        if (props.recipe.image_filename) {
            setImagePath(props.recipe.image_filename)
        };
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
                        <Link to={{ pathname: '/Erstellen', state: props.recipe }}>
                            <div className="rezept__edit">
                                <img src={edit_bild} alt='edit' height='30px'></img>
                            </div>
                        </Link>
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
                                    <div className="rezept__group_text">{x.group}:</div>
                                    <table style={{ tableLayout: 'fixed'}}>
                                        <colgroup>
                                            <col style={{ width: '35px' }} />
                                            <col style={{ width: '10px' }} />
                                            <col style={{ width: '50px' }} />
                                            <col style={{ width: 'calc(100% - 85px)' }} />
                                        </colgroup>
                                        <tbody>
                                            {
                                                x.items.map(y => {
                                                    return (
                                                        <tr key={'show-item-' + x.group + y.id}>
                                                            <td style={{ textAlign: 'right' }}>{y.quantity}</td>
                                                            <td></td>
                                                            <td>{y.unit}</td>
                                                            <td>{y.ingredient}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }) : null
                    }
                </div>
                <div className="rezept__show_text_container">
                    <div className="rezept__show_text_header">Zubereitung:</div>
                    <div className="rezept__show_text">
                        {props.recipe.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rezept;