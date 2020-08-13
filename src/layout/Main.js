import React from "react"
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { BrowserRouter as Router,Switch, Route } from "react-router-dom"
import {AppContext} from '../context/AppContext'

// import Header from "./Header"
// import Section from "./Section"
// import Footer from "./Footer"


const Main = () =>{
    


  return(
    <>
    <Router>
      <Switch>
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </Router>
    
    
    </>
  )
}

export default Main