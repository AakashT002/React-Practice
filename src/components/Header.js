import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from 'react-md/lib/Toolbars';

import '../assets/stylesheets/Header.scss';

class Header extends Component {
  renderUsername() {
    const username = sessionStorage.getItem('username');

    return <h4 className="header__username">{username}</h4>;
  }

  renderTitle() {
    return (
      <Link className="header__title-link" to={'/home'}>
        KeyFob
      </Link>
    );
  }

  render() {
    return (
      <div className="Header">
        <Toolbar
          actions={this.renderUsername()}
          className="Header-toolbar"
          colored
          title={this.renderTitle()}
        />
      </div>
    );
  }
}

export default Header;
