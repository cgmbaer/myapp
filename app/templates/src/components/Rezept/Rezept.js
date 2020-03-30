import React from 'react';
import './Rezept.css';
import edit_bild from './edit.png';

var recipe = {
  id: 1,
  titel: "Thunfischfilet in Zimt-Sesam-Kruste auf Chili-Mango-Salat",
  bild_url: "https://img.chefkoch-cdn.de/rezepte/1298601234964040/bilder/721436/crop-600x400/thunfischfilet-in-zimt-sesam-kruste-auf-chili-mango-salat.jpg",
  personen: 4,
  zutaten: [
    [
      'Zutaten:',
      [400, 'g', 'Thunfisch, (Sushiqualität)'],
      [1, 'EL', 'Zimt'],
      [2, 'EL', 'Sesam, heller'],
      [2, 'EL', 'Sesam, schwarzer'],
      [null, null, 'Sesam, schwarzer'],
      [null, null, 'Fleur de Sel'],
      [null, null, 'Pfeffer, schwarzer aus der Mühle'],
    ],
    [
      'Für den Salat',
      [1, null, 'Mango(s)'],
      [1, null, 'Schalotte(n)'],
      [1, 'Hand', 'Minze'],
      [1, 'Hand', 'Koriandergrün'],
      [1, 'kleine', 'Paprikaschote(n), rot'],
      [2, null, 'Chilischote(n), rot'],
      [1, 'EL', 'Olivenöl'],
      [null, null, 'Balsamico, weißer'],
      [null, null, 'Salz'],
      [1, null, 'Orange(n), unbehandelt'],
    ]
  ],
  zubereitung: [
    'Die Mango schälen und in kleine Würfel schneiden. Die Schalotte fein hacken. Minze und Koriander ebenfalls fein hacken. Die Paprika fein würfeln. Die Chili entkernen und ebenfalls fein würfeln.',
    'Salz, weißer Balsamico und Olivenöl zu einer Marinade verrühren. Alle Zutaten zu einem Salat vermischen und ca. 30 Minuten einziehen lassen. Die Schale der Orange in Zesten reißen.',
    'Salz und Pfeffer mit dem Zimt mischen und auf einen Teller geben. Beide Sesamsorten mischen und auf einen Teller geben. Den Thunfisch portionieren, so dass er nach dem Braten in Scheiben geschnitten werden kann.',
    'Den Thunfisch in der Gewürzmischung wälzen, damit er davon überzogen ist. Anschließend etwas mit Wasser befeuchten und im Sesam wälzen. Der Sesam muss am Fisch haften.',
    'Den Thunfisch von allen Seiten anbraten. Er sollte innen rot bleiben! Ich mache dies immer in einer guten beschichteten Pfanne, ohne Fett. Es kann aber auch mit Olivenöl gemacht werden.',
    'Den gebratenen Thunfisch in dünne Scheiben schneiden.',
  ]
}

function Rezept(props) {

  const table_zutaten = () => (
    recipe.zutaten.map((value, index) => {
      let table = [];
      for(let val = 1; val < value.length; val++){
        table.push(
          <tr key={val}>
            <td align='right'><div style={{ minWidth: '20px' }}>{value[val][0]}</div></td>
            <td><div style={{ marginLeft: '0.5rem', minWidth: '60px' }}>{value[val][1]}</div></td>
            <td>{value[val][2]}</td>
          </tr>
        )
      }
      return (
        <div key={index}>
          <div className='table__header' key={index}>{value[0]}</div>
            <table>
              <tbody>
                {table}
              </tbody>
            </table>
        </div>
      )
    })
  );

  const table_zubereitung = () => (
    recipe.zubereitung.map((value,index) => {
      return (
      <div key={index} style={{ marginTop: '1rem' }}><b>{`${index + 1}. `}</b>{value}</div>
      )
    })
  )

  return (
    <div className="rezept">
      <div className="rezept__bild">
        <img src={recipe.bild_url} alt={recipe.titel} width='100%'></img>
      </div>
      <div className="rezept__header">
        <div className="rezept__titel">{recipe.titel}</div>
        <div className="rezept__bearbeiten">
          <img src={edit_bild} alt='edit' height='50px' width='50px'></img>
        </div>
      </div>
      <div className="rezept__beschreibung">
        <div className="rezept__einkauf">
          <div className="rezept__personen"></div>
          <div className="rezept__hinzufügen"></div>
        </div>
        <div className="rezept__zutaten">{table_zutaten()}</div>
        <div className="rezept__zubereitung">{table_zubereitung()}</div>
      </div>
    </div>
  );
}

export default Rezept;
