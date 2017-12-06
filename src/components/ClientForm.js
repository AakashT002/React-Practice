import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, SelectField, IconSeparator, Avatar } from 'react-md';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

import { CLIENT_TYPES } from '../utils/constants';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/stylesheets/ClientForm.css';

const ClientForm = ({ 
  client, 
}) => {
  return (
    <div className="ClientForm">
      <div className="ClientForm__forms-section">  
      <section className="ClientForm__client-section">
        <CardActions className="ClientForm__client--details">
          <TextField
            id="clientId"
            label="Client Name"
            required
            value={client.clientId}
            className="md-cell md-cell--bottom ClientForm__client-name"
            inputClassName="font_size__normal"
          />
          <TextField
            id="rootUrl"
            label="Root URL"
            value={client.rootUrl}
            className="md-cell md-cell--bottom ClientForm__root-url"
            inputClassName="font_size__normal"
          />
          <SelectField
            id="description"
            label="Client Type"
            className="md-cell ClientForm__select"
            value={client.description}
            menuItems={CLIENT_TYPES}
          />
        </CardActions>
        <CardActions className="ClientForm__bottom-section">
          <IconSeparator label="Saved" iconBefore className="ClientForm__registered">
            <Avatar icon={<i className="material-icons ClientForm__saved-icon">done</i>} suffix="white" />
          </IconSeparator>
          <Button
            className="ClientForm__save"
            label="SAVE"
          />
          <Button
            className="ClientForm__remove"
            label="REMOVE"
          />
        </CardActions>
      </section>
          </div>
      
    </div>
  );
};

ClientForm.propTypes = {
  index: PropTypes.number,
  client: PropTypes.object,
};

export default ClientForm;
