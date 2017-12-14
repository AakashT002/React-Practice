import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { Card, Button, DataTable, TableBody, DialogContainer } from 'react-md';

import Domain from '../components/Domain';
import {
  CLIENT_TYPES,
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
      selectedDomainName: '',
      selectedDomainIndex: -1,
      tabIndexInPreview: 0,
      domainPreview: {
        header: '',
        content: []
      },
    };

    this.confirmDelete = this.confirmDelete.bind(this);
    this.handlePreviewClick = this.handlePreviewClick.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleDomainPreviewNext = this.handleDomainPreviewNext.bind(this);
    this.handleDomainPreviewPrevious = this.handleDomainPreviewPrevious.bind(this);
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
      selectedDomainName: realm,
      selectedDomainIndex: index,
      deleteModalVisible: true,
    });
  }

  cancelDelete() {
    this.setState({
      selectedDomainName: '',
      selectedDomainIndex: -1,
      deleteModalVisible: false,
    });
  }

  removeRealm(i, realmName) {
    const domains = Object.assign([], this.state.domainList);
    this.props.dispatch(handleRealmDeletion(i, realmName)).then(() => {
      this.setState({
        selectedDomainName: '',
        selectedDomainIndex: 0,
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

  getDomainPreview(index, tabIndexInPreview) {
    const { domainList } = this.state;
    let { domainPreview } = this.state;
    let domain = domainList[index];

    if (tabIndexInPreview === 1) {
      let content = [];

      domain.roles.forEach(role => {
        content.push({id: role.id, value: role.name});
      });
      domainPreview.content = content;
      domainPreview.header = `Roles (${domain.roles.length})`;

    } else if (tabIndexInPreview === 2) {
      let content = [];

      domain.users.forEach(user => {
        content.push({id: user.id, value: user.username});
      });
      domainPreview.content = content;
      domainPreview.header = `Users (${domain.users.length})`;

    } else {
      let content = [];
      let spa = 0, api = 0, web = 0, others = 0;
      let typeSPA = CLIENT_TYPES[0];
      let typeAPI = CLIENT_TYPES[1];
      let typeWeb = CLIENT_TYPES[2];
      let otherApps = 'Others';

      domain.clients.forEach(client => {
        if (!!client.description &&
          client.description === CLIENT_TYPES[0]) {
          spa++;
        } else if (!!client.description &&
          client.description === CLIENT_TYPES[1]) {
          api++;
        } else if (!!client.description &&
          client.description === CLIENT_TYPES[2]) {
          web++;
        } else {
          others++;
        }
      });
      /* eslint-disable no-unused-expressions */
      spa > 0 ? spa > 1 ?
        content.push(
          {id: 0, value:`${typeSPA.substr(0, typeSPA.length - 6)} (${spa})`}) :
        content.push(
          {id: 0, value:`${typeSPA.substr(0, typeSPA.length - 6)}`}) : null;
      api > 0 ? api > 1 ?
        content.push(
          {id: 1, value:`${typeAPI.substr(0, typeAPI.length - 6)} (${api})`}) :
        content.push(
          {id: 1, value:`${typeAPI.substr(0, typeAPI.length - 6)}`}) : null;
      web > 0 ? web > 1 ?
        content.push(
          {id: 2, value:`${typeWeb.substr(0, typeWeb.length - 10)} (${web})`}) :
        content.push(
          {id: 2, value:`${typeWeb.substr(0, typeWeb.length - 10)}`}) : null;
      others > 0 ? others > 1 ?
        content.push({id: 3, value:`${otherApps} (${others})`}) :
        content.push({id: 3, value:`${otherApps}`}) : null;
      /* eslint-enable no-unused-expressions */

      domainPreview.content = content;
      domainPreview.header = `Clients (${domain.clients.length})`;
    }

    return domainPreview;
  }

  handlePreviewClick(index) {
    let { tabIndexInPreview, domainPreview } = this.state;

    tabIndexInPreview = 0;
    domainPreview = this.getDomainPreview(index, tabIndexInPreview);
    this.setState({ selectedDomainIndex: index, tabIndexInPreview, domainPreview });
  }

  handleDomainPreviewPrevious(index) {
    let { tabIndexInPreview, domainPreview } = this.state;

    tabIndexInPreview -= 1;
    domainPreview = this.getDomainPreview(index, tabIndexInPreview);
    this.setState({ tabIndexInPreview, domainPreview });
  }

  handleDomainPreviewNext(index) {
    let { tabIndexInPreview, domainPreview } = this.state;

    tabIndexInPreview += 1;
    domainPreview = this.getDomainPreview(index, tabIndexInPreview);
    this.setState({ tabIndexInPreview, domainPreview });
  }


  render() {
    const { requesting } = this.props;
    const {
      domainList,
      selectedDomainIndex,
      tabIndexInPreview,
      domainPreview } = this.state;

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
                      clients={realm.clients ? realm.clients : []}
                      users={realm.users ? realm.users : []}
                      roles={realm.roles ? realm.roles : []}
                      handleIconClick={this.handleIconClick}
                      confirmDelete={this.confirmDelete}
                      removeRealm={() => this.removeRealm(i, realm.realm)}
                      handleChange={() => this.handleChange()}
                      domainPreview={domainPreview}
                      handlePreviewClick={this.handlePreviewClick}
                      handleDomainPreviewClose={() => {
                        this.setState({ selectedDomainIndex: -1 });
                      }}
                      handleDomainPreviewPrevious={this.handleDomainPreviewPrevious}
                      handleDomainPreviewNext={this.handleDomainPreviewNext}
                      previewIndex={selectedDomainIndex}
                      tabIndexInPreview={tabIndexInPreview}
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
                    this.state.selectedDomainIndex,
                    this.state.selectedDomainName
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
