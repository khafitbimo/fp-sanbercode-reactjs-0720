import React from "react"
import { BrowserRouter as Router,Switch, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import SignUp from './SignUp'


const Main = () =>{

    
  return(
    <>
    <Router>
        <Switch>
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route path='/' component={Dashboard} />
        </Switch>
    </Router>

    </>
  )
}

export default Main