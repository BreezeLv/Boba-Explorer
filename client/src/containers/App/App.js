import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import SearchResultPage from '../SearchResultPage';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

function App() {
  return (
    <div className="App">
      <Helmet
        titleTemplate="%s - Boba Explorer"
        defaultTitle="Boba Explorer"
      >
        <meta
          name="description"
          content="A website to explore bobas!"
        />
      </Helmet>

      <NavBar />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" render={(props) => <LoginPage {...props} isLogin={true} />} />
        <Route exact path="/register" render={(props) => <LoginPage {...props} isLogin={false} />} />
        <Route path="/search" component={SearchResultPage} />
        <Route path="" component={HomePage} />
      </Switch>
      
      <Footer />
    </div>
  );
}

export default App;
