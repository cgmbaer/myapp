import React, { useState, useEffect } from 'react'
import './Einkauf.css'

import EinkaufRezept from './EinkaufRezept'
import EinkaufKategorie from './EinkaufKategorie'

import useFetch from '../hooks/useFetch'
import { funFetch } from '../hooks/funFetch'

import remove_bild from '../../images/close.png'
import copy_bild from '../../images/copy.png'

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
            <EinkaufKategorie key={'EinkaufKategorie-' + index} category={x} index={index} deleteItem = {deleteItem} />
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
                y => (y.quantity || ' ') + ' ' + (y.unit || ' ') + ' ' + y.item
            ).join("\n")
        ).join("\n\n") : null
        navigator.clipboard.writeText(text.replace(/ +(?= )/g,''))
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
                <div className="einkauf__clear_all" onClick={() => handleClearClick()}>
                    <img src={remove_bild} alt='clear' height='40px'></img>
                </div>
                <div className="einkauf__clipboard" onClick={() => handleCopyClick()}>
                    <img src={copy_bild} alt='copy' height='40px'></img>
                </div>
            </div>
        </div>
    )
}

export default Einkauf