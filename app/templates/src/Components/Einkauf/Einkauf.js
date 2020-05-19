import React, { useState, useEffect } from 'react'
import './Einkauf.css'

import EinkaufRezept from './EinkaufRezept'
import EinkaufKategorie from './EinkaufKategorie'

import useFetch from '../hooks/useFetch'
import { funFetch } from '../hooks/funFetch'

import remove_bild from '../../images/close.png'
import copy_bild from '../../images/copy.png'

function copyToClipboard(textToCopy) {
    var textArea;

    function isOS() {
        //can use a better detection logic here
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.readOnly = true;
        textArea.contentEditable = true;
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range, selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyTo() {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    createTextArea(textToCopy);
    selectText();
    copyTo();
}

const Einkauf = () => {

    const [items, setItems] = useState(null)
    const [recipes, setRecipes] = useState(null)

    const data = useFetch('get_shopping', 'Shopping')

    const deleteRecipe = (id) => {
        let new_items = [...items.map(
            x => {
                return (
                    { ...x, items: x.items.filter(y => y.recipe_id !== id) }
                )
            }
        )]
        setItems(recipes.length > 1 ? [...new_items.filter(x => x.items.length > 0)] : null)
        setRecipes([...recipes.filter(x => x.recipe_id !== id)])
        funFetch('edit_shopping', { recipeId: id, clear: true })
    }

    const deleteItem = (id) => {
        let new_items = [...items.map(
            x => {
                return (
                    { ...x, items: x.items.filter(y => y.id !== id) }
                )
            }
        )]
        setItems([...new_items.filter(x => x.items.length > 0)])
        funFetch('edit_shopping', { id: id, clear: true })
    }

    const recipe_items = recipes ? recipes.map((x, index) => {
        return (
            <EinkaufRezept key={'EinkaufRezept-' + index} recipe={x} deleteRecipe={deleteRecipe} />
        )
    }) : null

    const list_items = items ? items.map((x, index) => {
        return (
            <EinkaufKategorie key={'EinkaufKategorie-' + index} category={x} index={index} deleteItem={deleteItem} />
        )
    }) : <div className="einkauf__leer">Der Einkaufswagen ist leer.</div>

    const handleClearClick = () => {
        setRecipes([])
        setItems(null)
        funFetch('edit_shopping', { clear: true })
    }

    const handleCopyClick = () => {
        let text = items ? items.map(
            x => x.category + ":\n" + x.items.map(
                y => ((y.quantity || '') + ' ' + (y.unit || '') + ' ' + y.item).trim()
            ).join("\n")
        ).join("\n\n") : null
        text = text.replace(/ +(?= )/g, '')
        copyToClipboard(text)
    }

    useEffect(() => {
        if (data) {
            setItems(data.ingredients)
            setRecipes(data.recipes)
        }
    }, [data]);

    return (
        <div className="einkauf__container">
            {items ? (
                <div className="einkauf__recipe_header">
                    Rezepte:
                </div>
            ) : null}
            <div className="einkauf__recipe_container">
                {recipe_items}
            </div>
            <div className="einkauf__recipe_container">
                {list_items}
            </div>
            <div className="einkauf__toolbar_container">
                <div className="einkauf__clear_all" onTouchStart onClick={() => handleClearClick()}>
                    <img src={remove_bild} alt='clear' height='40px'></img>
                </div>
                <div className="einkauf__clipboard" onTouchStart onClick={() => handleCopyClick()}>
                    <img src={copy_bild} alt='copy' height='40px'></img>
                </div>
            </div>
        </div>
    )
}

export default Einkauf