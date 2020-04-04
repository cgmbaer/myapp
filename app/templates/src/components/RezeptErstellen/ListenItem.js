import React, { useState } from 'react';
import { sortableHandle } from 'react-sortable-hoc';
import './ListenItem.css';
import dragIcon from './dragIcon.png';
import { Collapse } from 'react-collapse';
import edit_bild from './edit.png';

const DragHandle = sortableHandle(() => (
    <div className='drag_icon__container'>
        <img src={dragIcon} alt='->' width='50%'></img>
    </div>
));

const ListenItem = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='list_item__container'>
            <div className='list_item__flat'>
                <DragHandle />
                <div className='list_item_text'>
                    500 gr getrocknete Tomaten
                </div>
                <div className='list_item__button' onClick={toggle}>
                    <img src={edit_bild} alt='edit' height='50%'></img>
                </div>
            </div>
            <Collapse isOpened={isOpen}>
                test
            </Collapse>
            <hr></hr>
        </div>
    );
}

export default ListenItem;
