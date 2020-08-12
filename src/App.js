import React from 'react';
import logo from './logo.svg';
import './App.css';
import {UserContext, UserProvider} from './context/UserContext'
import MovieData from './pages/MovieData'
import Movies from './pages/Movies'
import Main from './layout/Main'
import SignIn from './layout/SignIn'
import SignUp from './layout/SignUp'
import Games from './pages/Games'
import GamesData from './pages/GameData'

function App() {
  return (
    <>
    <UserProvider>
    <GamesData/>
    </UserProvider>
    
    </>
    
  );
}

export default App;
