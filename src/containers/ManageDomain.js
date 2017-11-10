import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/stylesheets/ManageDomain.css';
import DomainTable from '../components/DomainTable';
import { connect } from 'react-redux';
import { loadDomains } from '../store/domain/action';

export class ManageDomain extends Component {
  handleRegisterClick() {
    this.props.history.push('/register-domain');
  }

  handleClientClick() {
    // this.props.history.push('/register-domain');
  }

  handleUserClick() {
    this.props.history.push('/manage-users');
  }
  componentWillMount() {
    this.props.dispatch(loadDomains());
  }

  render() {
    const { domainList } = this.props;
    return (
      <div className="DomainPage__background">
        <DomainTable
          domainList={domainList}
          handleRegisterClick={() => {
            this.handleRegisterClick();
          }}
          handleClientClick={() => {
            this.handleClientClick();
          }}
          handleUserClick={() => {
            this.handleUserClick();
          }}
        />
      </div>
    );
  }
}

ManageDomain.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  domainList: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    domainList: state.domain.domainList,
  };
}

export default connect(mapStateToProps)(ManageDomain);
