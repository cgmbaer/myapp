import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Rezept from './components/Rezept/Rezept';
import Einkauf from './components/Einkauf/Einkauf';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Toolbar />
        <Switch>
          <Route exact path="/" component={Rezept}/>
          <Route path="/Einkauf" component={Einkauf}/>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
