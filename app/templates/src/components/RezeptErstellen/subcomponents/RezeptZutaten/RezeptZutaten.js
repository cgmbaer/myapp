import React, { useState } from 'react';
import {
    sortableContainer,
    sortableElement
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './RezeptZutaten.css';
import Zutat from '../Zutat/Zutat';

const SortableItem = sortableElement(({ value }) => (
    <Zutat />
));

const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
});

const RezeptZutaten = (props) => {
    const [items, setItems] = useState(
        ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
    );

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMove(items, oldIndex, newIndex))
    };

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='RezeptZutaten__container'>
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                {items.map((value, index) => (
                    <SortableItem
                        key={`item-${value}`}
                        index={index}
                        value={value}
                        isOpen={isOpen}
                        toggle={toggle}>
                    </SortableItem>
                ))}
            </SortableContainer>
        </div>
    );
}

export default RezeptZutaten;