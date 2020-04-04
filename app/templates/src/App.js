import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Rezept from './components/Rezept/Rezept';
import Einkauf from './components/Einkauf/Einkauf';
import RezeptErstellen from './components/RezeptErstellen/RezeptErstellen';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Toolbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Rezept" component={Rezept}/>
          <Route path="/Einkauf" component={Einkauf}/>
          <Route path="/RezeptErstellen" component={RezeptErstellen}/>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
