import React from 'react';
import logo from './logo.svg';
import './App.css';
import {UserContext, UserProvider} from './context/UserContext'
import MovieData from './pages/MovieData'
import Movies from './pages/Movies'
import Main from './layout/Main'
import SignIn from './layout/SignIn'
import SignUp from './layout/SignUp'

function App() {
  return (
    <>
    <UserProvider>
    <SignUp/>
    </UserProvider>
    
    </>
    
  );
}

export default App;
