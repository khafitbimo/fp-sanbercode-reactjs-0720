import React from 'react';
import logo from './logo.svg';
import './App.css';
import {UserProvider} from './context/UserContext'
import MovieData from './pages/MovieData'
import Movies from './pages/Movies'
import Main from './layout/Main'

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
