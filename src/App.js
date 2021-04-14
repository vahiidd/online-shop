import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import styled from 'styled-components';
import {
  Home,
  About,
  Error,
  Products,
  Private,
  Cart,
  SingleProduct,
  Checkout,
} from './pages';
import Login from './features/login/Login';
import SignUp from './features/signUp/SignUp';
import SignUpResult from './features/signUp/SignUpResult';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/private'>
            <Private />
          </Route>
          <Route exact path='/products/:id'>
            <SingleProduct />
          </Route>
          <Route exact path='/checkout'>
            <Checkout />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signUp'>
            <SignUp />
          </Route>
          <Route exact path='/signUpResult'>
            <SignUpResult />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
