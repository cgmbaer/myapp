import React, { useState } from 'react';
import { sortableHandle } from 'react-sortable-hoc';
import './Zutat.css';
import dragIcon from '../../../../images/dragIcon.png';
import { Collapse } from 'react-collapse';
import edit_bild from '../../../../images/edit.png';

const DragHandle = sortableHandle(() => (
    <div className='zutat__drag_icon'>
        <img src={dragIcon} alt='->' width='50%'></img>
    </div>
));

const ListenItem = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const items = () => {
        return null
    }

    return (
        <div className='zutat__container'>
            <div className='zutat__flat'>
                <DragHandle />
                <div className='zutat__text'>
                    <input className='zutat__quantitiy' type='text' placeholder='250'></input>
                    <input className='zutat__unit' type='text' placeholder='gr'></input>
                    <input className='zutat__ingredient' type='text' placeholder='Butter'></input>
                </div>
                <div className='zutat__button' onClick={toggle}>
                    <img src={edit_bild} alt='edit' height='50%'></img>
                </div>
            </div>
            <Collapse isOpened={isOpen}>
                test
            </Collapse>
        </div>
    );
}

export default ListenItem;
