import React, { Component } from 'react';
import { Card, CardTitle, CardActions, FontIcon } from 'react-md';
import TextField from 'react-md/lib/TextFields';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

import DomainForm from '../components/DomainForm';
import { saveDomain, validate } from '../store/domain/action';
import { BACKEND_API } from '../utils/constants';

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
    var realmObj = {
      realm: this.state.domainName,
      enabled: true,
      clients: this.state.clients,
    };
    this.props.dispatch(saveDomain(realmObj)).then(() => {
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
  }

  removeClient(index) {
    var clients = Object.assign([], this.state.clients);
    clients.splice(index, 1);
    this.setState({ clients });
  }

  validateDomain(domainName) {
    this.props.dispatch(validate(domainName));
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

      if (name === 'description' && value === BACKEND_API) {
        newClient['standardFlowEnabled'] = false;
      }
      currClients[i] = newClient;

      return {
        clients: currClients,
      };
    });
  }

  render() {
    const { domainValid } = this.props;
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
              <DomainForm
                key={i}
                index={i}
                client={clients[i]}
                handleChange={(name, value) =>
                  this.handleChange(name, value, i)}
                removeClient={index => this.removeClient(index)}
              />
            ))}
          </div>

          <div className="domain-page__buttons">
            <Button
              className="domain-page__add-button"
              label="Add Client"
              raised
              primary
              onClick={() => this.appendInput()}
            />
            <Button
              className="domain-page__save-button"
              label="Save"
              disabled={!domainValid}
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
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    domainValid: state.domain.domainValid,
  };
}

export default connect(mapStateToProps)(DomainPage);
