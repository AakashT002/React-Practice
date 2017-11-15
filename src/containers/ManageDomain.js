import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/stylesheets/ManageDomain.css';
import DomainTable from '../components/DomainTable';
import { connect } from 'react-redux';
import { loadDomains } from '../store/domain/action';
import { MANAGE_USER_FOR_DOMAIN_NAME } from '../utils/constants';

export class ManageDomain extends Component {
  handleRegisterClick() {
    this.props.history.push('/register-domain');
  }

  handleClientClick() {
    // this.props.history.push('/register-domain');
  }

  handleUserClick(i, domainList) {
    sessionStorage.setItem(MANAGE_USER_FOR_DOMAIN_NAME, domainList[i].realm);
    this.props.history.push('/manage-users');
  }
  componentWillMount() {
    this.props.dispatch(loadDomains());
  }

  render() {
    const { domainList, requesting } = this.props;
    return (
      <div className="DomainPage__background">
        <DomainTable
          domainList={domainList}
          requesting={requesting}
          handleRegisterClick={() => {
            this.handleRegisterClick();
          }}
          handleClientClick={() => {
            this.handleClientClick();
          }}
          handleUserClick={(i, domainList) => {
            this.handleUserClick(i, domainList);
          }}
        />
      </div>
    );
  }
}

ManageDomain.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
  domainList: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    domainList: state.domain.domainList,
    requesting: state.domain.requesting,
  };
}

export default connect(mapStateToProps)(ManageDomain);
