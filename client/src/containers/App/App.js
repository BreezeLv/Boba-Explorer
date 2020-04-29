import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import SearchResultPage from '../SearchResultPage';
import ReviewPage from '../ReviewPage';
import ExplorePage from '../ExplorePage';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import {logoutUser} from './actions';


const mapStateToProps = (state) => {
  return {
      user : state.global.user,
      userData : state.global.userData,
  }
};
  
const mapDispatchToProps = (dispatch) => {
  return {
      logoutUser : () => dispatch(logoutUser()),
  };
};

function App({
  user,
  userData,
  logoutUser
}) {

  console.log("App Reloaded")
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

      <NavBar logoutHandler={logoutUser} login={user} userData={userData} />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" render={(props) => <LoginPage {...props} isLogin={true} />} />
        <Route exact path="/register" render={(props) => <LoginPage {...props} isLogin={false} />} />
        <Route path="/search" component={SearchResultPage} />
        <Route path="/review" component={ReviewPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="" component={HomePage} />
      </Switch>
      
      <Footer />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
