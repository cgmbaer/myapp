import React, { useState, useEffect } from 'react';
import './Kochbuch.css';
import Rezept from '../Rezept/Rezept'
import search_zeichen from '../../images/search.png';

function Kochbuch() {

  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState(null);

  const searchSpace =(e)=>{
    let keyword = e.target.value;
    setSearchText(keyword.toLowerCase())
  }

  const items = recipes.filter((x) => {
    if (searchText == null)
      return x
    else if (x.name.toLowerCase().includes(searchText)) {
      return x
    }
    return null
  }).map(x => {
    return (
      <Rezept key={x.id} recipe={x}></Rezept>
    )
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/recipe/api/v1.0/get_recipes');
        let data = await response.json();
        setRecipes(data);
      } catch (error) {
        setRecipes([
          { 'id': 1, 'name': 'Kaiserschmarrn', 'quantity': 2, 'has_image': 1, 'has_photo': 0 },
          { 'id': 2, 'name': 'Pancakes', 'quantity': 2, 'has_image': 1, 'has_photo': 0 },
          { 'id': 3, 'name': 'Wiener Schnitzel', 'quantity': 4, 'has_image': 1, 'has_photo': 0 },
          { 'id': 4, 'name': 'French Toast', 'quantity': 4, 'has_image': 1, 'has_photo': 0 },
          { 'id': 5, 'name': 'Ungarisches Gulasch', 'quantity': 4, 'has_image': 1, 'has_photo': 0 },
          { 'id': 6, 'name': 'Quiche Lorraine', 'quantity': 4, 'has_image': 1, 'has_photo': 0 },
          { 'id': 7, 'name': 'Causa Limeña', 'quantity': 4, 'has_image': 1, 'has_photo': 0 },
        ]);
      }
    }
    fetchData()
  }, []);

  return (
    <div className="kochbuch__container">
      <div className="kochbuch__search">
        <div className="kochbuch__search_icon">
          <img src={search_zeichen} alt='add' height='50px'></img>
        </div>
        <div className="kochbuch__search_text">
          <input className="kochbuch__search_input" type='text' onChange={(e)=>searchSpace(e)}></input>
        </div>
      </div>
      {items}
    </div>
  );
}

export default Kochbuch;
