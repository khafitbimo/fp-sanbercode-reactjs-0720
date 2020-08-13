import React from 'react';
import logo from './logo.svg';
import './App.css';
import {UserProvider} from './context/UserContext'
import {AppProvider} from './context/AppContext'
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
      <Main/>
    </UserProvider>
    
    </>
    
  );
}

export default App;
