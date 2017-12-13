import React, { Component } from 'react';
import LoginPage from './LoginPage'
import SuccessfullLogin from './SuccessfullLogin'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={LoginPage}/>
        <Route path='/authorized' component={SuccessfullLogin}/>
      </Switch>
    );
  }
}

export default App;
