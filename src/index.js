import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, 
  Switch, Route, Link} from "react-router-dom";
import Manufacturer from './Manufacturer';

ReactDOM.render(
  <React.StrictMode>
      <Router>
    <div>
    
    
    <Switch>
    <Route exact path="/"  component={App}/>
    <Route path = "/manufacturer/:manufacturer" component={Manufacturer}/>
   
    <Route render={() => <h1> Page not  found</h1>}/>
    </Switch>
    </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
