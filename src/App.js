import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './components/admin'
import { BrowserRouter, Route, Router } from 'react-router-dom'
import Home from './components/home'
import './components/styling.css'
import history from './components/history/history'
import SignIn from './components/signIn'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getProfile } from './redux/actions/authAction'


class App extends React.Component {

  constructor(props) {
    super(props)
    let token = localStorage.getItem("token");
    if(token){
      props.getProfile()
    }
  }
  state = {
    admin: false
  }
  render() {

    return (
      <Router
        history={history}
      >
        <div className="App">

          <Admin />




        </div>
      </Router>

    );
  }
}



let mapStateToProps = (store) => {

  return {
    authState: store
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => {
      dispatch(getProfile())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export let setData
