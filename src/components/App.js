import React from 'react';
import Login from './login';
import {Main} from './main';

import '../css/App.css';
import { BrowserRouter ,Route, Link, NavLink } from "react-router-dom";

function App() {
  return (

  <BrowserRouter>
    <Route exact path="/" component={Login}/>  
    <Route path="/main" component={Main}/>
  </BrowserRouter>

    // <div className="App">
    //     <div style={{display:'flex', flexDirection:'column', height:'900px'}}>
    //         <div style={{display:'flex', flex:1}}></div>
    //         <Login/>
    //         <div style={{display:'flex', flex:3}}></div>
    //     </div>
    // </div>
  );
}

export default App;
