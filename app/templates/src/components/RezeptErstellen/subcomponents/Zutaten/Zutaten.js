import React, { useState } from 'react';
import {
    sortableContainer,
    sortableElement
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './Zutaten.css';
import ListenItem from './ListenItem';

const SortableItem = sortableElement(({ value }) => (
    <ListenItem/>
));

const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
});

const Zutaten = (props) => {
    const [items, setItems] = useState(
        ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
    );

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMove(items, oldIndex, newIndex))
    };

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='list__container'>
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

export default Zutaten;