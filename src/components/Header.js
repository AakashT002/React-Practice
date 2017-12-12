import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from 'react-md/lib/Toolbars';
import { Button } from 'react-md';
import PropTypes from 'prop-types';
import keycloak from '../keycloak-config';
import '../assets/stylesheets/Header.css';
import keyfob_logo from '../assets/images/keyfob_logo.jpg';
import default_user from '../assets/images/default_user.jpg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  renderUsername() {
    const username = this.props.userName;
    sessionStorage.setItem('userRoles', this.props.userRoles);
    return (
      <div>
        <div className="Header_username-img">
          <img src={default_user} className="Header__user-icon" alt="logo" />
          <div className="Header__username">
            <label>{username}</label>
          </div>
          <div className="Header__sign-out">
            <Button
              className="Header__sign-out-button"
              onClick={() => keycloak.logout()}
            >
              Logout&gt;
            </Button>
          </div>
        </div>
      </div>
    );
  }

  renderTitle() {
    return (
      <div className="Header__info">
        <Button
          primary
          className="fa fa-wrench Header_home"
          onClick={this.handleClick}
        >
          <h4 className="Header_home-text">Home</h4>
        </Button>
        <div className="Header__title">
          <span className="Header__title-key">
            Key
            <span className="Header__title-fob">Fob</span>
          </span>
          <img src={keyfob_logo} className="Header__title-logo" alt="logo" />
        </div>
      </div>
    );
  }

  handleClick() {
    this.props.history.push('/domains');
  }

  render() {
    return (
      <div className="Header--featured">
        <Toolbar
          actions={this.renderUsername()}
          className="Header__toolbar"
          title={this.renderTitle()}
        />
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
  userRoles: PropTypes.array,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
    userRoles: state.user.userRoles,
  };
}

export default connect(mapStateToProps)(Header);
