import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import DomainPage from './DomainPage';
import LoginPage from './LoginPage';
import ManageDomain from './ManageDomain';
import CreateUserPage from './CreateUserPage';
import NotFound from '../components/NotFound';
import { CURRENT_DOMAIN_NAME } from '../utils/constants';
import '../assets/stylesheets/App.css';
import 'material-design-icons/iconfont/material-icons.css';

export class App extends Component {
  checkAuthenticated(component, path) {
    const Component = component;
    return this.props.isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component to={path} />
    );
  }

  checkSessionStorage(component, path) {
    const Component = component;
    const domainName = sessionStorage.getItem(CURRENT_DOMAIN_NAME);
    if (domainName === null) {
      return <Redirect to="/domains" />;
    } else {
      return <Component to={path} />;
    }
  }

  render() {
    return (
      <div className="App">
        <Header history={this.props.history} />
        <div className="App-content">
          <Switch>
            <Route
              exact
              path="/"
              render={() => this.checkAuthenticated(Redirect, '/domains')}
            />
            <Route
              exact
              path="/login"
              component={() => this.checkAuthenticated(LoginPage)}
            />
            <Route exact path="/domains" component={ManageDomain} />
            <Route exact path="/manage-users" component={CreateUserPage} />
            <Route
              exact
              path="/manage-domain"
              component={() => this.checkSessionStorage(DomainPage)}
            />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(App));
