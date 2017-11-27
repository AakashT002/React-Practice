import React, { Component } from 'react';
import { Card, TabsContainer, Tabs, Tab, Button } from 'react-md';
import PropTypes from 'prop-types';
import { CURRENT_DOMAIN_NAME } from '../utils/constants';

import '../assets/stylesheets/DomainPage.css';

class DomainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      clients: [],
      roles: [],
      users: [],
    };
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
      var role = {};
      this.setState({ roles: roles.concat([role]) });
    } else if (activeTab === 2) {
      var user = {};
      this.setState({ users: users.concat([user]) });
    }
  }

  render() {
    const currentdomainName = sessionStorage.getItem(CURRENT_DOMAIN_NAME);
    return (
      <div className="DomainPage">
        <h1 className="DomainPage__domain-name">
          {currentdomainName !== null ? currentdomainName : 'Heartbeat 3.0'}</h1>
        <Card className="card-centered">
          <TabsContainer panelClassName="md-grid" onTabChange={(index) => this.handleTabChange(index)}>
            <Tabs tabId="domain-tab" className="DomainPage__tabs">
              <Tab label="CLIENTS">
                <h3>CLIENTS Tab</h3>
              </Tab>
              <Tab label="ROLES">
                <h3>ROLES Tab</h3>
              </Tab>
              <Tab label="USERS">
                <h3>USERS Tab</h3>
              </Tab>
            </Tabs>
          </TabsContainer>
        </Card>
        <Button
          floating
          className="fa fa-plus fa-2x DomainPage__plus-icon"
          onClick={() => this.handlePlusClick()}>
        </Button>
      </div>
    );
  }
}

DomainPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default DomainPage;
