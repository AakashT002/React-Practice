import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { Card, Button, DataTable, TableBody } from 'react-md';

import Domain from '../components/Domain';
import { CURRENT_DOMAIN_NAME } from '../utils/constants';

import {
  loadDomains,
  getUser,
  getClient,
  getRole,
  handleRealmDeletion,
} from '../store/domain/action';

import '../assets/stylesheets/ManageDomain.css';

export class ManageDomain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chkFlag: false,
      domainList: props.domainList || [],
    };
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleIconClick(realm) {
    sessionStorage.setItem(CURRENT_DOMAIN_NAME, realm);
    this.props.history.push('./register-domain');
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(loadDomains()).then(() => {
      const { domainList } = this.props;
      domainList.map(realm => {
        dispatch(getUser(domainList, realm.realm));
        dispatch(getClient(domainList, realm.realm));
        dispatch(getRole(domainList, realm.realm));
        return realm;
      });

      this.setState({ domainList });
    });
  }

  removeRealm(i, realmName) {
    const domains = Object.assign([], this.state.domainList);
    this.props.dispatch(handleRealmDeletion(i, realmName)).then(() => {
      domains.splice(i, 1);
      this.setState({ domainList: domains });
    });
  }

  addNewDomain() {
    const { domainList } = this.state;
    const domain = {
      realm: '',
    };
    domainList.splice(0, 0, domain);
    this.setState({ domainList });
  }

  handleChange() {
    this.setState({ chkFlag: true });
  }

  render() {
    const { requesting } = this.props;
    const { domainList } = this.state;

    if (domainList && domainList.length > 0) {
      return (
        <div className="ManageDomainPage">
          <h1 className="ManageDomainPage__domain-name">Manage Domains</h1>
          <Card className="card-block-centered">
            <div className="ManageDomainPage__domain-numbers">
              <h3 className="ManageDomain__domain-text">
                {domainList.length} DOMAINS
              </h3>
              <Button
                floating
                className="fa fa-plus ManageDomain__plus-icon"
                onClick={() => this.addNewDomain()}
              />
            </div>
            <DataTable plain className="ManageDomainPage__domain-list">
              <TableBody>
                {domainList.map((realm, i) => {
                  return (
                    <Domain
                      index={i}
                      key={realm.realm}
                      realm={realm.realm}
                      clients={realm.clients || '0' || 'fetching...'}
                      users={realm.users || '0' || 'fetching...'}
                      roles={realm.roles || '0' || 'fetching...'}
                      handleIconClick={this.handleIconClick}
                      removeRealm={() => this.removeRealm(i, realm.realm)}
                      handleChange={() => this.handleChange()}
                      chkFlag={this.state.chkFlag}
                    />
                  );
                })}
              </TableBody>
            </DataTable>
          </Card>
        </div>
      );
    } else if (!requesting) {
      return (
        <div className="ManageDomainPage">
          <h1 className="ManageDomainPage__domain-name">Manage Domains</h1>
          <Card className="card-block-centered">
            <div className="ManageDomainPage__domain-numbers">
              <h3 className="ManageDomain__domain-text">0 DOMAINS</h3>
              <Button floating className="fa fa-plus ManageDomain__plus-icon" />
              <h1 className="ManageDomainPage__no-domain">
                Looks like there are no domains here{' '}
              </h1>
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="ManageDomainPage">
          <h1 className="ManageDomainPage__domain-name">Manage Domains</h1>
          <Card className="card-block-centered">
            <div className="ManageDomainPage__domain-numbers">
              <h3 className="ManageDomain__domain-text">0 DOMAINS</h3>
              <Button floating className="fa fa-plus ManageDomain__plus-icon" />
            </div>
            <div className="ManageDomain__spinner-div">
              <SyncLoader color={'#BC477B'} loading={true} />
            </div>
          </Card>
        </div>
      );
    }
  }
}

ManageDomain.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
  domainList: PropTypes.array,
  chkFlag: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    domainList: state.domain.domainList,
    requesting: state.domain.requesting,
  };
}

export default connect(mapStateToProps)(ManageDomain);
