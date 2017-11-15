import React, { Component } from 'react';
import { Card, CardTitle, CardActions, FontIcon } from 'react-md';
import TextField from 'react-md/lib/TextFields';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

import ClientForm from '../components/ClientForm';
import { saveDomain, validateDomain, validateClient } from '../store/domain/action';
import { CLIENT_TYPES } from '../utils/constants';

import '../assets/stylesheets/DomainPage.css';

class DomainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domainName: '',
      clients: [
        {
          clientId: '',
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
        },
      ],
    };
  }

  componentDidUpdate() {
    window.scrollTo(0, 10000);
  }

  formValid() {
    return (
      this.validatePresence(this.state.clientId) &&
      this.validatePresence(this.state.rootUrl) &&
      this.validatePresence(this.state.description)
    );
  }

  validatePresence(value) {
    return value.toString().length > 0;
  }

  onSave() {
    var domainObject = {
      realm: this.state.domainName,
      enabled: true,
      clients: this.state.clients,
    };
    this.props.dispatch(saveDomain(domainObject)).then(() => {
      this.props.history.push('/manage-domain');
    });
  }

  appendInput() {
    var client = {
      clientId: '',
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
    };
    this.setState({ clients: this.state.clients.concat([client]) });
    this.props.dispatch(validateClient(false));
  }

  removeClient(index) {
    var clients = Object.assign([], this.state.clients);
    clients.splice(index, 1);
    this.setState({ clients });
    this.props.dispatch(validateClient(true));
  }

  validateDomain(domainName) {
    this.props.dispatch(validateDomain(domainName));
  }

  handleChange(name, value, i) {
    this.setState(() => {
      let currClients = this.state.clients;
      let newClient = this.state.clients[i];

      if (name === 'rootUrl') {
        newClient['redirectUris'] = [`${value}/*`];
        newClient['webOrigins'] = [`${value}`];
      }
      newClient[name] = value;

      if (name === 'description' && value === CLIENT_TYPES[1]) {
        newClient['standardFlowEnabled'] = false;
      }
      currClients[i] = newClient;

      return {
        clients: currClients,
      };
    });
  }

  validateClient(value) {
    let existingClients = this.state.clients;
    let clientCount = 0;
    for(var j=0; j < existingClients.length; j++) {
      if(value === existingClients[j].clientId && value !== '') {
        clientCount++;
      }
    }
    if(clientCount === 1) {
      this.props.dispatch(validateClient(true));
    } else{
      this.props.dispatch(validateClient(false));
    }
  }

  render() {
    const { domainValid, clientValid } = this.props;
    const { clients } = this.state;
    return (
      <div className="domain-page">
        <Card className="md-block-centered">
          <CardTitle title="Register Domain" className="title" />
          <CardActions>
            <TextField
              id="domainName"
              label="Domain Name"
              required
              className="md-cell md-cell--bottom domain-page__input"
              inputClassName="font_size__normal"
              onChange={value => this.setState({ domainName: value })}
              onBlur={() => this.validateDomain(this.state.domainName)}
            />
            {domainValid ? (
              <FontIcon iconClassName="fa fa-check-circle-o domain-page__green" />
            ) : (
              <FontIcon iconClassName="fa fa-times-circle-o domain-page__red" />
            )}
          </CardActions>
          <h2 className="domain-page__form-title">Clients:</h2>
          <div id="domain-page__clients-div">
            {clients.map((_, i) => (
              <ClientForm
                key={i}
                index={i}
                client={clients[i]}
                handleChange={(name, value) =>
                  this.handleChange(name, value, i)}
                removeClient={index => this.removeClient(index)}
                checkClient={clients.length-1 === i ? true : false}
                clientValid={this.props.clientValid}
                validateClient={(value) => this.validateClient(value)}
              />
            ))}
          </div>

          <div className="domain-page__buttons">
          <Button
            className="domain-page__add-button"
            label="Add Client"
            disabled={!clientValid}
            raised
            primary
            onClick={() => this.appendInput()}
          />
          <Button
            className="domain-page__save-button"
            label="Save"
            disabled={!domainValid || !clientValid}
            raised
            primary
            onClick={() => this.onSave()}
          />
          <Button
            className="domain-page__cancel-button"
            label="Cancel"
            raised
            primary
            onClick={() => this.props.history.push('/home')}
          />
          </div>
        </Card>
      </div>
    );
  }
}

DomainPage.propTypes = {
  dispatch: PropTypes.func,
  domainName: PropTypes.string,
  clients: PropTypes.array,
  domainValid: PropTypes.bool,
  clientValid: PropTypes.bool,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    domainValid: state.domain.domainValid,
    clientValid: state.domain.clientValid,
  };
}

export default connect(mapStateToProps)(DomainPage);
