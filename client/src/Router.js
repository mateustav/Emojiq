import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Privacy from './components/Privacy';
import Oauth from './components/Oauth';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const Router = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/privacy/" component={Privacy} />
      <Route exact path="/oauth/" component={Oauth} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Router;
