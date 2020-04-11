import React, { useState, useEffect } from 'react';
import './Kochbuch.css';
import Rezept from '../Rezept/Rezept'

function Kochbuch() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/recipe/api/v1.0/get_recipes');
        let data = await response.json();
        setRecipes(data);
      } catch (error) {
        setRecipes([
          { 'id': 1, 'name': 'Kaiserschmarrn', 'quantity': 2, 'has_image': 1, 'has_photo': 0 },
          { 'id': 2, 'name': 'Pancakes', 'quantity': 2, 'has_image': 1, 'has_photo': 0  },
          { 'id': 3, 'name': 'Wiener Schnitzel', 'quantity': 4, 'has_image': 1, 'has_photo': 0  },
          { 'id': 4, 'name': 'French Toast', 'quantity': 4, 'has_image': 1, 'has_photo': 0  },
          { 'id': 5, 'name': 'Ungarisches Gulasch', 'quantity': 4, 'has_image': 1, 'has_photo': 0  },
          { 'id': 6, 'name': 'Quiche Lorraine', 'quantity': 4, 'has_image': 1, 'has_photo': 0  },
          { 'id': 7, 'name': 'Causa Limeña', 'quantity': 4, 'has_image': 1, 'has_photo': 0  },
        ]);
      }
    }
    fetchData()
  }, []);

  return (
    <div className="kochbuch__container">
      {recipes.map(x => <Rezept key={x.id} recipe={x}></Rezept>)}
    </div>
  );
}

export default Kochbuch;
