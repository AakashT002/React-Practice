import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from 'react-md/lib/Toolbars';
import { Button } from 'react-md';
import PropTypes from 'prop-types';

import keycloak from '../keycloak-config';

import '../assets/stylesheets/Header.css';
import default_pic from '../assets/images/default_user.jpg';

class Header extends Component {
  renderUsername() {
    const username = this.props.userName;
    return (
      <div className="Header__header-username-keyfob">
        <div className="Header__header-img-div">
          <img
            src={default_pic}
            className="Header__header-img"
            alt={username}
          />
        </div>
        <div className="Header__username">
          <label>{username}</label>  </div>
        <div className="Header__header-sign-out">
          <Button
            icon
            className="fa fa-sign-out fa-2x button_sign-out"
            onClick={() => keycloak.logout()}>
          </Button>
        </div>
      </div >
    );
  }

  renderTitle() {
    return (
      <a className="Header__title-link" href={'/home'}>
        Key<span className="Header__title-fob">Fob</span>
      </a>
    );
  }

  render() {
    return (
      <div className="Header--featured">
        <Toolbar
          actions={this.renderUsername()}
          className="Header__toolbar"
          colored
          title={this.renderTitle()}
        />
      </div>
    );
  }
}


Header.propTypes = {
  userName: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
  };
}

export default connect(mapStateToProps)(Header);