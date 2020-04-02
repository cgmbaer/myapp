import React, { Component } from 'react';
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './RezeptErstellen.css';
import dragIcon from './dragIcon.png';

const DragHandle = sortableHandle(() => (
    <div className='drag_icon__container'>
        <img src={dragIcon} alt='->' width='100%'></img>
    </div>
));

const SortableItem = sortableElement(({ value }) => (
    <div className='list_item__container'>
        <DragHandle />
        <div className='list_item_text'>
            <input type="text" id="fname" name="fname"></input>
        </div>
    </div>
));

const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
});

class RezeptErstellen extends Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        const { items } = this.state;

        return (
            <div className='list__container'>
                <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                    {items.map((value, index) => (
                        <SortableItem key={`item-${value}`} index={index} value={value} />
                    ))}
                </SortableContainer>
            </div>
        );
    }
}
export default RezeptErstellen;