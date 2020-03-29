import React from 'react';
import './Rezept.css';

var recipe = {
  id: 1,
  titel: "Thunfischfilet in Zimt-Sesam-Kruste auf Chili-Mango-Salat",
  bild_url: "https://img.chefkoch-cdn.de/rezepte/1298601234964040/bilder/721436/crop-600x400/thunfischfilet-in-zimt-sesam-kruste-auf-chili-mango-salat.jpg",
  personen: 4,
  zutaten: [
    [400, 'g', 'Thunfisch, (Sushiqualität)'],
    [1, 'EL', 'Zimt'],
    [2, 'EL', 'Sesam, heller'],
    [2, 'EL', 'Sesam, schwarzer'],
    [, , 'Sesam, schwarzer'],
    [, , 'Fleur de Sel'],
    [, , 'Pfeffer, schwarzer aus der Mühle'],
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


function Rezept() {
  return (
    <div className="rezept">
      <div className="rezept__header">
        <div className="rezept__titel"></div>
        <div className="rezept__bearbeiten"></div>
      </div>
      <div className="rezept__bild"></div>
      <div className="rezept__beschreibung">
        <div className="rezept__einkauf">
          <div className="rezept__personen"></div>
          <div className="rezept__hinzufügen"></div>
        </div>
        <div className="rezept__zutaten"></div>
        <div className="rezept__zubereitung"></div>
      </div>
    </div>
  );
}

export default Rezept;
