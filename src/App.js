import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/partials/navbar';
import Login from './components/login';
import Register from './components/register';
import List  from './components/list';
import Board  from './components/board';
import Footer from './components/partials/footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css"
import history from './history'


const App = () => {
  return (
      <Router history={history} >
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route  path='/register' component={Register} />
          <Route  path='/board' component={Board} />
          <Route  path='/list' component={List} />
        </Switch>
        <Footer/>
      </Router>
  )
}

export default App;