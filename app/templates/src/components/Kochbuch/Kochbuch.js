import React, { useState, useEffect } from 'react';
import './Kochbuch.css';
import Rezept from '../Rezept/Rezept'

function Kochbuch() {

  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/recipe/api/v1.0/get_recipes');
        let data = await response.json();
        setRecipes(data);
      } catch (error) {
        setRecipes([{ 'id': 1, 'name': 'asdf' }, { 'id': 2, 'name': 'fdsa' }]);
      }
    }
    fetchData()
  }, []);

  return (
    <div className="kochbuch__container">
      {show ?
        <div>
          <div className='kochbuch__show_false' onClick={() => setShow(!show)}>
            <div className='kochbuch__show_false_text'>
              zurück
            </div>
          </div>
          <Rezept></Rezept>
        </div>
        :
        recipes.map(x => <div key={x.id} onClick={() => setShow(!show)}>{x.name}</div>)
      }
    </div>
  );
}

export default Kochbuch;
