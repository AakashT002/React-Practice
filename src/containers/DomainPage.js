import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  TabsContainer,
  Tabs,
  Tab,
  Button,
  FontIcon,
  DialogContainer,
} from 'react-md';
import PropTypes from 'prop-types';
import ClientForm from '../components/ClientForm';
import {
  loadClients,
  saveClient,
  addClient,
  updateClient,
} from '../store/client/action';
import { loadRoles, saveRole, handleRoleDeletion } from '../store/roles/action';
import {
  CURRENT_DOMAIN_NAME,
  IGNORED_CLIENTS,
  IGNORED_ROLES,
  CLIENT_TYPES,
  DELETE_ROLE_MESSAGE,
} from '../utils/constants';

import Roles from '../components/Roles';
import '../assets/stylesheets/DomainPage.css';

const currentdomainName = sessionStorage.getItem(CURRENT_DOMAIN_NAME);
const maxTabs = currentdomainName === 'master' ? 2 : 3;

class DomainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab || 0,
      clients: [],
      roles: [],
      users: [],
      teams: [],
      checkIcon: false,
      focusOnNewElement: false,
      deleteRoleObj: {
        selectedRoleId: '',
        selectedRoleIndex: -1,
        deleteRoleModalVisible: false,
      },
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onRoleSave = this.onRoleSave.bind(this);
    this.renderFeedbackMessage = this.renderFeedbackMessage.bind(this);
    this.confirmRoleDelete = this.confirmRoleDelete.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(loadClients(currentdomainName)).then(() => {
      let clients = [];
      const { clientList } = this.props;

      clientList.forEach(client => {
        if (!IGNORED_CLIENTS.includes(client.clientId.toString())) {
          if (currentdomainName === 'master') {
            if (
              client.clientId.substr(client.clientId.length - 6, 6) !== '-realm'
            ) {
              let clientObj = {
                clientId: client.clientId,
                rootUrl: client.rootUrl || '',
                description: client.description || '',
                redirectUris: client.redirectUris,
                webOrigins: client.webOrigins,
                implicitFlowEnabled: client.implicitFlowEnabled,
                directAccessGrantsEnabled: client.directAccessGrantsEnabled,
                bearerOnly: client.bearerOnly,
                consentRequired: client.consentRequired,
                publicClient: client.publicClient,
                protocol: client.protocol,
                standardFlowEnabled: client.standardFlowEnabled,
                id: client.id,
                showAsSaved: false,
                isClientSaved: true,
              };
              clients = clients.concat([clientObj]);
            }
          } else {
            let clientObj = {
              clientId: client.clientId,
              rootUrl: client.rootUrl || '',
              description: client.description || '',
              redirectUris: client.redirectUris,
              webOrigins: client.webOrigins,
              implicitFlowEnabled: client.implicitFlowEnabled,
              directAccessGrantsEnabled: client.directAccessGrantsEnabled,
              bearerOnly: client.bearerOnly,
              consentRequired: client.consentRequired,
              publicClient: client.publicClient,
              protocol: client.protocol,
              standardFlowEnabled: client.standardFlowEnabled,
              id: client.id,
              showAsSaved: false,
              isClientSaved: true,
            };
            clients = clients.concat([clientObj]);
          }
        }
      });

      this.setState({ clients });
    });

    dispatch(loadRoles(currentdomainName)).then(() => {
      let { roleList } = this.props;
      let roles = [];
      for (var j = 0; j < roleList.length; j++) {
        if (!IGNORED_ROLES.includes(roleList[j].name.toString())) {
          let roleObj = {
            id: roleList[j].id,
            name: roleList[j].name,
          };
          roles = roles.concat([roleObj]);
        }
      }
      this.setState({ roles });
    });
  }

  componentDidUpdate() {
    const { activeTab, focusOnNewElement } = this.state;

    if (this.clientElement && activeTab === 0 && focusOnNewElement) {
      this.clientElement.focus();
      this.setState({ focusOnNewElement: false });
    }

    if (this.roleElement && activeTab === 1) {
      this.roleElement.focus();
    }
  }

  handleChange(value, i) {
    const { roles } = this.state;
    let role = roles[i];
    role.name = value;
    roles[i] = role;
    this.setState({ roles });
    this.setState({ checkIcon: false });
  }

  handleTabChange(index) {
    this.setState({ activeTab: index });
  }

  handlePlusClick() {
    const { clients, roles, users, activeTab } = this.state;
    this.setState({ focusOnNewElement: true });
    if (activeTab === 0) {
      if (
        this.state.clients.length === 0 ||
        this.state.clients[0].id !== undefined
      ) {
        this.props.dispatch(addClient()).then(() => {
          var client = {
            clientId: '',
            rootUrl: '',
            redirectUris: [],
            webOrigins: [],
            description: '',
            implicitFlowEnabled: false,
            directAccessGrantsEnabled: true,
            bearerOnly: false,
            consentRequired: false,
            publicClient: true,
            protocol: 'openid-connect',
            standardFlowEnabled: true,
            isClientSaved: this.props.isClientSaved,
            showAsSaved: false,
          };
          clients.splice(0, 0, client);
          clients.forEach(client => {
            client.showAsSaved = false;
          });
          this.setState({ clients });
        });
      }
    } else if (activeTab === 1) {
      let role = {
        id: '',
        name: '',
        isDirty: true,
        disableButton: '',
      };

      if (roles.length === 0) {
        roles.splice(0, 0, role);
        this.setState({ roles });
      } else if (roles[0].id.length > 0) {
        roles.splice(0, 0, role);
        this.setState({ roles });
      }
    } else if (activeTab === 2) {
      var user = {};
      this.setState({ users: users.concat([user]) });
    }
  }

  handleFieldChange(name, value, i) {
    this.setState(() => {
      let currClients = this.state.clients;
      let newClient = this.state.clients[i];

      if (name === 'rootUrl') {
        newClient['redirectUris'] = [`${value}/*`];
        newClient['webOrigins'] = [`${value}`];
      }
      newClient[name] = value;
      newClient.isClientSaved = false;

      if (name === 'description' && value === CLIENT_TYPES[1]) {
        newClient['standardFlowEnabled'] = false;
      } else if (name === 'description' && value !== CLIENT_TYPES[1]) {
        newClient['standardFlowEnabled'] = true;
      }
      currClients[i] = newClient;
      currClients.forEach(client => {
        client.showAsSaved = false;
      });
      return {
        clients: currClients,
      };
    });
  }

  onClientSave(index) {
    var clientObject = Object.assign({}, this.state.clients[index]);
    var id = clientObject.id;
    delete clientObject['isClientSaved'];
    delete clientObject['id'];
    delete clientObject['showAsSaved'];
    if (id !== undefined) {
      this.props.dispatch(updateClient(clientObject, id)).then(() => {
        let clients = this.state.clients;
        let currentclient = clients[index];
        currentclient.isClientSaved = true;
        currentclient.showAsSaved = true;
        this.setState({ clients });
      });
    } else {
      this.props.dispatch(saveClient(clientObject)).then(() => {
        let clients = this.state.clients;
        let currentclient = clients[index];
        currentclient.isClientSaved = true;
        currentclient.showAsSaved = true;
        if (!this.props.isError) {
          currentclient.id = this.props.clientId;
        }
        this.setState({ clients });
      });
    }
  }

  validateClientForm(index) {
    return (
      this.validatePresence(this.state.clients[index].clientId) &&
      this.validatePresence(this.state.clients[index].rootUrl) &&
      this.validatePresence(this.state.clients[index].description)
    );
  }

  validatePresence(value) {
    return value.toString().length > 0;
  }

  renderFeedbackMessage(index) {
    const { showMessageForRole } = this.props;
    const { checkIcon } = this.state;
    if (index === 0 && checkIcon === true) {
      if (showMessageForRole === 'Registered') {
        return (
          <div className="DomainPage__icon">
            <FontIcon
              iconClassName="fa fa-check-circle-o"
              className="DomainPage__green"
            />
            <span className="DomainPage__message-green">Saved</span>
          </div>
        );
      } else {
        return (
          <div className="DomainPage__icon">
            <FontIcon
              iconClassName="fa fa-times-circle-o"
              className="DomainPage__red"
            />
            <span className="DomainPage__message-red">Role Already Exists</span>
          </div>
        );
      }
    }
  }

  onRoleSave(index) {
    const currentdomainName = sessionStorage.getItem(CURRENT_DOMAIN_NAME);
    const { roles } = this.state;
    if (roles[index].name !== '') {
      var roleObject = {
        name: this.state.roles[index].name,
      };
    }
    this.props.dispatch(saveRole(roleObject, currentdomainName)).then(() => {
      if (this.props.saving === true) {
        roles[index].id = this.props.roleId;
      }
      roles[index].isDirty = false;
      roles[index].disableButton = this.props.saving;
      this.setState({ roles });
      this.setState({ checkIcon: true });
    });
  }

  confirmRoleDelete(index, roleid) {
    const newRoleObj = this.state.deleteRoleObj;
    newRoleObj.selectedRoleId = roleid;
    newRoleObj.selectedRoleIndex = index;
    newRoleObj.deleteRoleModalVisible = true;
    this.setState({
      deleteRoleObj: newRoleObj,
    });
  }

  removeRole(index, roleId) {
    const currentdomainName = sessionStorage.getItem(CURRENT_DOMAIN_NAME);
    this.props.dispatch(handleRoleDeletion(roleId, currentdomainName));
    const { roles } = this.state;
    const newRoleObj = this.state.deleteRoleObj;
    newRoleObj.selectedRoleId = '';
    newRoleObj.selectedRoleIndex = 0;
    newRoleObj.deleteRoleModalVisible = false;
    this.setState({
      deleteRoleObj: newRoleObj,
    });
    roles.splice(index, 1);
    this.setState({ roles });
  }

  cancelDelete() {
    const newRoleObj = this.state.deleteRoleObj;
    newRoleObj.selectedRoleId = '';
    newRoleObj.selectedRoleIndex = -1;
    newRoleObj.deleteRoleModalVisible = false;
    this.setState({
      deleteRoleObj: newRoleObj,
    });
  }

  renderTeamsTab() {
    return (
      <Tab label="TEAMS" className="DomainPage__users-tab">
        <h3>TEAMS Tab</h3>
      </Tab>
    );
  }

  renderClientsTab() {
    const { clients } = this.state;
    return (
      <Tab label="CLIENTS" className="DomainPage__clients-tab">
        {clients.length !== 0 ? (
          clients.map((client, i) => (
            <ClientForm
              key={i}
              index={i}
              client={client}
              handleFieldChange={(name, value) =>
                this.handleFieldChange(name, value, i)}
              handleSave={this.onClientSave.bind(this)}
              validateClientForm={this.validateClientForm.bind(this)}
              isClientSaved={this.state.clients[i].isClientSaved}
              showAsSaved={this.state.clients[i].showAsSaved}
              isError={this.props.isError}
              feedbackMessage={this.props.feedbackMessage}
              inputRef={el => (this.clientElement = el)}
            />
          ))
        ) : (
          <div className="DomainPage__clients-msg">No Clients Added Yet</div>
        )}
      </Tab>
    );
  }

  renderRolesTab() {
    const { roles } = this.state;
    return (
      <Tab label="ROLES" className="DomainPage__roles-tab">
        {roles.length > 0 ? (
          roles.map((role, i) => (
            <Roles
              key={role.id}
              index={i}
              roleId={role.id}
              roleName={role.name}
              renderFeedbackMessage={this.renderFeedbackMessage}
              disableButton={role.disableButton}
              isDirty={role.isDirty}
              handleChange={this.handleChange}
              onRoleSave={this.onRoleSave}
              focusOnText={this.focusOnText}
              blurOnText={this.blurOnText}
              inputRef={el => (this.roleElement = el)}
              confirmRoleDelete={this.confirmRoleDelete}
            />
          ))
        ) : (
          <div>
            <h1 className="DomainPage__roles--no-data">No Roles Added Yet</h1>
          </div>
        )}
      </Tab>
    );
  }

  renderUsersTab() {
    return (
      <Tab label="USERS" className="DomainPage__users-tab">
        <h3>USERS Tab</h3>
      </Tab>
    );
  }

  renderApplicationTabs() {
    return (
      <Tabs tabId="domain-tab" className="DomainPage__tabs">
        {this.renderClientsTab()}
        {this.renderRolesTab()}
        {this.renderUsersTab()}
      </Tabs>
    );
  }

  renderMasterDomainTabs() {
    return (
      <Tabs tabId="domain-tab" className="DomainPage__tabs">
        {this.renderTeamsTab()}
        {this.renderUsersTab()}
      </Tabs>
    );
  }

  render() {
    const { activeTab, clients, roles } = this.state;
    let applicableTabs = null;
    if (currentdomainName === 'master') {
      applicableTabs = this.renderMasterDomainTabs();
    } else {
      applicableTabs = this.renderApplicationTabs();
    }
    return (
      <div className="DomainPage">
        <h1 className="DomainPage__domain-name">
          {currentdomainName !== null && currentdomainName}
        </h1>
        <Card className="card-centered">
          <TabsContainer
            panelClassName="md-grid"
            activeTabIndex={activeTab}
            onTabChange={this.handleTabChange}
          >
            {applicableTabs}
          </TabsContainer>
          <div className="DomainPage__navigate">
            <hr className="DomainPage__line" />
            <Button
              flat
              disabled={activeTab === 0}
              key="previous"
              label="Previous"
              className="DomainPage__button-prev"
              onClick={() => this.setState({ activeTab: activeTab - 1 })}
            >
              keyboard_arrow_left
            </Button>
            <Button
              flat
              disabled={activeTab === maxTabs - 1}
              key="next"
              label="Next"
              iconBefore={false}
              className="DomainPage__button-next"
              onClick={() => this.setState({ activeTab: activeTab + 1 })}
            >
              keyboard_arrow_right
            </Button>
          </div>
        </Card>
        <DialogContainer
          id="deleteModal-roles"
          className="DomainPage__deleteModal-roles"
          visible={this.state.deleteRoleObj.deleteRoleModalVisible}
          title="REMOVE ROLE"
          onHide={() => {
            const newRoleObj = this.state.deleteRoleObj;
            newRoleObj.selectedRoleId = '';
            newRoleObj.selectedRoleIndex = -1;
            newRoleObj.deleteRoleModalVisible = false;
            this.setState({
              deleteRoleObj: newRoleObj,
            });
          }}
        >
          <br />
          <p>
            {DELETE_ROLE_MESSAGE}
            <br />
            <br />
            <br />
            <div>
              <Button
                className="DomainPage__roles--delete-no"
                flat
                onClick={() => {
                  this.cancelDelete();
                }}
              >
                <label className="DomainPage__roles--delete-label-no">NO</label>
              </Button>
            </div>
            <div>
              <Button
                className="DomainPage__roles--delete-yes"
                flat
                onClick={() => {
                  this.removeRole(
                    this.state.deleteRoleObj.selectedRoleIndex,
                    this.state.deleteRoleObj.selectedRoleId
                  );
                }}
              >
                <label className="DomainPage__roles--delete-label-yes">
                  YES
                </label>
              </Button>
            </div>
          </p>
        </DialogContainer>
        <Button
          floating
          className="fa fa-2x DomainPage__plus-icon"
          onClick={this.handlePlusClick}
        >
          add
        </Button>
      </div>
    );
  }
}

DomainPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  activeTab: PropTypes.number,
  requesting: PropTypes.bool,
  loading: PropTypes.bool,
  clientList: PropTypes.array,
  roleList: PropTypes.array,
  teamList: PropTypes.array,
  isClientSaved: PropTypes.bool,
  isError: PropTypes.bool,
  feedbackMessage: PropTypes.string,
  clientId: PropTypes.string,
  saving: PropTypes.bool,
  showMessageForRole: PropTypes.string,
  roleId: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    loading: state.domain.loading,
    requesting: state.client.requesting,
    clientList: state.client.clientList,
    roleList: state.role.roleList,
    teamList: state.team.teamList,
    isClientSaved: state.client.isClientSaved,
    isError: state.client.isError,
    feedbackMessage: state.client.feedbackMessage,
    clientId: state.client.clientId,
    saving: state.role.saving,
    showMessageForRole: state.role.showMessageForRole,
    roleId: state.role.roleId,
  };
}

export default connect(mapStateToProps)(DomainPage);
