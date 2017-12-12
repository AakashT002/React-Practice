import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { Card, Button, DataTable, TableBody, DialogContainer } from 'react-md';

import Domain from '../components/Domain';
import {
  CURRENT_DOMAIN_NAME,
  DELETION_WARNING_MESSAGE,
} from '../utils/constants';

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
      deleteModalVisible: false,
      chkFlag: false,
      domainList: props.domainList || [],
      selectedRealmName: '',
      selectedRealmIndex: -1,
    };
    this.handleIconClick = this.handleIconClick.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  handleIconClick(realm) {
    sessionStorage.setItem(CURRENT_DOMAIN_NAME, realm);
    this.props.history.push('./manage-domain');
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

  confirmDelete(index, realm) {
    this.setState({
      selectedRealmName: realm,
      selectedRealmIndex: index,
      deleteModalVisible: true,
    });
  }

  cancelDelete() {
    this.setState({
      selectedRealmName: '',
      selectedRealmIndex: -1,
      deleteModalVisible: false,
    });
  }

  removeRealm(i, realmName) {
    const domains = Object.assign([], this.state.domainList);
    this.props.dispatch(handleRealmDeletion(i, realmName)).then(() => {
      this.setState({
        selectedRealmName: '',
        selectedRealmIndex: 0,
        deleteModalVisible: false,
      });
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
          <Card id="manageDomain" className="card-block-centered">
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
                      confirmDelete={this.confirmDelete}
                      removeRealm={() => this.removeRealm(i, realm.realm)}
                      handleChange={() => this.handleChange()}
                      chkFlag={this.state.chkFlag}
                    />
                  );
                })}
              </TableBody>
            </DataTable>
          </Card>
          <DialogContainer
            id="deleteModal"
            height="250px"
            width="350px"
            visible={this.state.deleteModalVisible}
            title="DELETE DOMAINS"
            onHide={() => {
              this.setState({ deleteModalVisible: false });
            }}
            aria-describedby="deleteModalDescription"
          >
            <p id="deleteModalDescription">
              {DELETION_WARNING_MESSAGE}
              <br />
              <br />
              <br />
              <br />
              <br />
              <Button
                className="ManageDomain__button--delete-yes"
                flat
                onClick={() => {
                  this.removeRealm(
                    this.state.selectedRealmIndex,
                    this.state.selectedRealmName
                  );
                }}
              >
                YES
              </Button>
              <Button
                className="ManageDomain__button--delete-no"
                flat
                onClick={() => {
                  this.cancelDelete();
                }}
              >
                NO
              </Button>
            </p>
          </DialogContainer>
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
