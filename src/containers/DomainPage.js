import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, TabsContainer, Tabs, Tab, Button, FontIcon } from 'react-md';
import PropTypes from 'prop-types';

import ClientForm from '../components/ClientForm';

import { loadClients } from '../store/client/action';
import { loadRoles, saveRole } from '../store/roles/action';
import { CURRENT_DOMAIN_NAME, IGNORED_CLIENTS, IGNORED_ROLES } from '../utils/constants';

import Roles from '../components/Roles';
import '../assets/stylesheets/DomainPage.css';

class DomainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: this.props.activeTab || 0,
			clients: [],
			roles: [],
			users: [],
      checkIcon: false,
		};

		this.handleTabChange = this.handleTabChange.bind(this);
		this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.checkRole = this.checkRole.bind(this);
	}

	componentWillMount() {
    const { dispatch } = this.props;
    const currentdomainName = sessionStorage.getItem(CURRENT_DOMAIN_NAME);

    dispatch(loadClients(currentdomainName)).then(() => {
      let clients = [];
      const { clientList } = this.props;

      clientList.forEach(client => {
        if (!IGNORED_CLIENTS.includes(client.clientId.toString())) {
          if (currentdomainName === 'master') {
            if (client.clientId.substr(client.clientId.length - 6, 6) !== '-realm') {
              let clientObj = {
                clientId: client.clientId,
                rootUrl: client.rootUrl,
                description: client.description,
              };
              clients = clients.concat([clientObj]);
            }
          } else {
            let clientObj = {
              clientId: client.clientId,
              rootUrl: client.rootUrl,
              description: client.description,
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
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }

  handleChange(value, i) {
    const { roles } = this.state;
    let role = roles[i];
    role.name = value;
    roles[i] = role;
    this.setState({ roles });
  }

	handleTabChange(index) {
		this.setState({ activeTab: index });
  }

  handlePlusClick() {
		const { clients, roles, users, activeTab } = this.state;
		if (activeTab === 0) {
			var client = {};
			this.setState({ clients: clients.concat([client]) });
		} else if (activeTab === 1) {
      let role = {
        id: '',
        name: '',
        isDirty: true,
        disableButton: '',
      };

			if(roles.length===0)
			{
			roles.splice(0, 0, role);
      this.setState({ roles });
			}
      else if (roles[0].id.length > 0 ) {
      roles.splice(0, 0, role);
      this.setState({ roles });
      }
		} else if (activeTab === 2) {
			var user = {};
			this.setState({ users: users.concat([user]) });
		}
	}

  checkRole(index) {
    const { message } = this.props;
    if (index === 0) {
      if (message === 'Registered') {
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

  onSave(index) {
    const currentdomainName = sessionStorage.getItem(CURRENT_DOMAIN_NAME);
    const { roles } = this.state;
    var roleObject = {
      name: this.state.roles[index].name,
    };
    this.props.dispatch(saveRole(roleObject, currentdomainName)).then(() => {
      roles[index].id = this.props.roleId;
      roles[index].isDirty = false;
      roles[index].disableButton = this.props.saving;
      this.setState({ roles });
    });
  }

  render() {
    const { activeTab, clients, roles } = this.state;
    const currentdomainName = sessionStorage.getItem(CURRENT_DOMAIN_NAME);

    return (
      <div className="DomainPage">
        <h1 className="DomainPage__domain-name">
          {currentdomainName !== null ? currentdomainName : 'Heartbeat 3.0'}
        </h1>
        <Card className="card-centered">
          <TabsContainer
            panelClassName="md-grid"
            activeTabIndex={activeTab}
            onTabChange={this.handleTabChange}
          >
            <Tabs tabId="domain-tab" className="DomainPage__tabs">
              <Tab label="CLIENTS" className="DomainPage__clients-tab">
                {clients.length !== 0 ? (
                  clients.map((client, i) => (
                    <ClientForm key={i} index={i} client={client} />
                  ))
                ) : (
                  <div className="DomainPage__clients-msg">
                    No Clients Added Yet
                  </div>
                )}
              </Tab>
              <Tab label="ROLES" className="DomainPage__roles-tab">
                <div 
								className="DomainPage__roles--card"
								>
                  {roles.length > 0 ? (
                    roles.map((role, i) => (
                      <Roles
                        key={role.id}
                        index={i}
                        roleId={role.id}
                        roleName={role.name}
                        disableButton={role.disableButton}
                        checkRole={this.checkRole}
                        isDirty={role.isDirty}
                        handleChange={this.handleChange}
                        onSave={this.onSave}
                        focusOnText={this.focusOnText}
                        blurOnText={this.blurOnText}
                        inputRef={el => (this.inputElement = el)}
                      />
                    ))
                  ) : (
                    <div>
                      <h1 className="DomainPage__roles--no-data">
                        No Roles<br />Added Yet
                      </h1>
                    </div>
                  )}
                </div>
              </Tab>
              <Tab label="USERS" className="DomainPage__users-tab">
                <h3>USERS Tab</h3>
              </Tab>
            </Tabs>
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
              disabled={activeTab === 2}
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
  saving: PropTypes.bool,
  message: PropTypes.string,
  roleId: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    loading: state.domain.loading,
    requesting: state.client.requesting,
    clientList: state.client.clientList,
    roleList: state.role.roleList,
    saving: state.role.saving,
    message: state.role.message,
    roleId: state.role.roleId,
  };
}

export default connect(mapStateToProps)(DomainPage);
