import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/stylesheets/HomePage.css';
import HomeForm from '../components/HomeForm';
import { connect } from 'react-redux';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  handleCreateDomain(e) {
    e.preventDefault();
    this.redirectToCreateDomain();
  }

  handleManageDomain(e) {
    e.preventDefault();
    this.redirectToCreateDomain();
  }

  redirectToCreateDomain() {
    this.props.history.push('/register-domain');
  }
  render() {
    return (
      <div className="HomePage__background">
        <HomeForm
          userName={this.props.userName || 'User'}
          handleCreateDomain={e => this.handleCreateDomain(e)}
          handleManageDomain={e => this.handleManageDomain(e)}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object,
  userName: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
  };
}

export default connect(mapStateToProps)(HomePage);
