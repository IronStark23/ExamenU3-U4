import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import Login from './components/Login';
import { auth } from './firebase';
import './App.css';

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setFirebaseUser(user);
      }
      else{
        setFirebaseUser(null);
      }
    })
  })

  return firebaseUser !== false ? (
      <Router>
        <div className="container">
          <Navbar firebaseUser = {firebaseUser}/>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/" exact>
            <div className="alert alert-primary" role="alert">
              Pagina en proceso de edicion!
            </div>
            </Route>
          </Switch>
        </div>
      </Router>
  ) : (
    <p>Cargando...</p>
  )
}

export default App;