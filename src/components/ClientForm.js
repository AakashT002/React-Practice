import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, SelectField, FontIcon } from 'react-md';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

import { CLIENT_TYPES } from '../utils/constants';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/stylesheets/ClientForm.css';

const ClientForm = ({ index, handleChange, removeClient, client, validateClient, checkClient, clientValid }) => {
  const clientCheckIcon = () => {
    if(checkClient) {
      if(clientValid) {
        return(<FontIcon iconClassName="fa fa-check-circle-o client-page__green" />);
      } else{
        return(<FontIcon iconClassName="fa fa-times-circle-o client-page__red" />);
      }
    }
  };
  
  return (
    <div className="client-form">
      <section className="dividers__example md-paper md-paper--3 client-form__client-section">
        <CardActions className="client-form__client--details">
          <TextField
            id="clientId"
            label="Client Name"
            required
            value={client.clientId}
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
            onChange={value => handleChange('clientId', value)}
            onBlur={() => validateClient(client.clientId)}
          />
          {clientCheckIcon()}
          
        </CardActions>
        <CardActions className="client-form__selection">
          <TextField
            id="rootUrl"
            label="Root URL"
            required
            value={client.rootUrl}
            className="md-cell md-cell--bottom"
            inputClassName="font_size__normal"
            onChange={value => handleChange('rootUrl', value)}
          />
          <SelectField
            id="description"
            label="Client Type"
            className="md-cell client-form__select"
            value={client.description}
            menuItems={CLIENT_TYPES}
            onChange={value => handleChange('description', value)}
          />
          <Button
            className="fa fa-minus-circle fa-2x client-form__minus"
            onClick={() => removeClient(index)}
            aria-hidden="true"
          />
        </CardActions>
      </section>
    </div>
  );
};

ClientForm.propTypes = {
  index: PropTypes.number,
  handleChange: PropTypes.func,
  removeClient: PropTypes.func,
  client: PropTypes.object,
  checkClient: PropTypes.bool,
  clientValid: PropTypes.bool,
  validateClient: PropTypes.func,
};

export default ClientForm;
