import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scenes } from '../config/scenes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './login/login';
import Menu from './menu';
import AccountInfo from '../components/dashboard/account_info';

class App extends Component {
  render() {
    const loggedIn = this.props.user.loggedIn;
    return(
      <Router> 
      {
        loggedIn === false ?
          <Route exact path='/' component={Login}/> 
        :
        <React.Fragment>
          <Menu { ...this.props }/>
          <AccountInfo {...this.props}/>
          <Switch>
              {scenes.map(s=>{
                  return(
                    <Route
                      strict
                      key={s.id}
                      path={s.path}
                      component={s.component}
                    />
                  )
              })}
          </Switch>
        </React.Fragment>
      }
      </Router>
    )
  }
}

function mapState(state){
  return{    
    user: state.user
  }
}

export default connect(mapState)(App);
