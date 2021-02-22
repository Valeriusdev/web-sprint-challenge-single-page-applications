import { Route, Switch } from 'react-router-dom'
import React from "react";
import './App.css';
import Home from './components/Home'
import Navbar  from "./components/Navbar";
import Form from './components/Form'

const App = () => {
  return (
    <div>
      <Navbar color='green'/>
      <h1 style= {{color:'blue'}}> Fresh pizza </h1>

      <Switch>
        <Route path='/pizza'>
          <Form/>
        </Route>        
        <Route exact path='/'>
          <Home/>
        </Route>
      </Switch>
    </div>
  );
};
export default App;
