import React, { Component } from 'react';
import { Card, CardTitle, CardActions, FontIcon } from 'react-md';
import TextField from 'react-md/lib/TextFields';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

import DomainForm from '../components/DomainForm';
import { load, validate } from '../store/domain/action';

import '../assets/stylesheets/DomainPage.css';

class DomainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formCount: ['input-0'],
      domainName: '',
      clients: [],
      clientId: '',
      rootUrl: '',
      description: '',
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
    let clients = [];
    if (
      this.state.clientId !== '' &&
      this.state.rootUrl !== '' &&
      this.state.description !== ''
    ) {
      var clientObj = {
        clientId: this.state.clientId,
        redirectUris: [`${this.state.rootUrl}/*`],
        webOrigins: [`${this.state.rootUrl}`],
        description: this.state.description,
        implicitFlowEnabled: false,
        directAccessGrantsEnabled: true,
        bearerOnly: false,
        consentRequired: false,
        publicClient: true,
        protocol: 'openid-connect',
        standardFlowEnabled:
          this.state.description === 'Backend API (API)' ? false : true,
      };
      clients = Object.assign([], this.state.clients);
      clients.push(clientObj);
    }

    if (clients.length === 0) {
      clients = this.state.clients;
    }
    var realmObj = {
      realm: this.state.domainName,
      enabled: true,
      clients: clients,
    };
    this.props.dispatch(load(realmObj));
    this.props.history.push('/manage-domain');
  }

  appendInput() {
    var clientObj = {
      clientId: this.state.clientId,
      redirectUris: [`${this.state.rootUrl}/*`],
      webOrigins: [`${this.state.rootUrl}`],
      description: this.state.description,
      implicitFlowEnabled: false,
      directAccessGrantsEnabled: true,
      bearerOnly: false,
      consentRequired: false,
      publicClient: true,
      protocol: 'openid-connect',
      standardFlowEnabled:
        this.state.description === 'Backend API (API)' ? false : true,
    };

    let clients = Object.assign([], this.state.clients);
    clients.push(clientObj);
    this.setState({ clients });
    this.setState({ clientId: '' });
    this.setState({ rootUrl: '' });
    this.setState({ description: '' });

    var newInput = `input-${this.state.formCount.length}`;
    this.setState({ formCount: this.state.formCount.concat([newInput]) });
  }

  removeClient(index) {
    var obj = Object.assign({}, this.state);
    obj.formCount.splice(index, 1);
    this.setState(obj);
  }

  validateDomain(domainName) {
    this.props.dispatch(validate(domainName));
  }

  render() {
    const { domainValid } = this.props;
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
            {this.state.formCount.map((_, i) => (
              <DomainForm
                key={i}
                index={i}
                handleChange={(name, value) => this.setState({ [name]: value })}
                removeClient={index => this.removeClient(index)}
              />
            ))}
          </div>

          <div className="domain-page__buttons">
          <Button
            className="domain-page__add-button"
            label="Add Client"
            disabled={!this.formValid() && this.state.formCount.length > 0}
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
