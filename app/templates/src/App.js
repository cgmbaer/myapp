import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Toolbar from './Components/Toolbar/Toolbar';
import Kochbuch from './Components/Kochbuch/Kochbuch';
import Erstellen from './Components/Erstellen/Erstellen';
import Einkauf from './Components/Einkauf/Einkauf';
import Einstellungen from './Components/Einstellungen/Einstellungen'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toolbar />
        <Switch>
        <Route exact path="/" component={Kochbuch}/>
        <Route path="/Erstellen" component={Erstellen}/>
        <Route path="/Einkauf" component={Einkauf}/>
        <Route path="/Einstellungen" component={Einstellungen}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
