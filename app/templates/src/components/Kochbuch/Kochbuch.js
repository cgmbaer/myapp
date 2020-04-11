import React, { useState, useEffect } from 'react';
import './Kochbuch.css';
import Rezept from '../Rezept/Rezept'
import close_bild from '../../images/close.png'

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
    <div>
      {show ?
        <div>
          <div className='kochbuch__show_false' onClick={() => setShow(!show)}>
            <div className='kochbuch__show_false_text'>
              <img src={close_bild} alt='close' height='40px' width='40px'></img>
            </div>
          </div>
          <Rezept></Rezept>
        </div>
        :
        <div></div>
      }
      <div className="kochbuch__container">
          {recipes.map(x => <div key={x.id} onClick={() => setShow(!show)}>{x.name}</div>)}
        </div>
    </div>
  );
}

export default Kochbuch;
