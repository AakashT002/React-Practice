import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, SelectField } from 'react-md';
import TextField from 'react-md/lib/TextFields';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/stylesheets/DomainForm.css';

const technology = ['Browser based apps (SPA)', 'Backend API (API)', 'Webapps (Webapps)'];
const DomainForm = ({ index, handleChange, removeClient, client }) => {
  return (
    <div className="domain-form">
      <section className="dividers__example md-paper md-paper--3 domain-form__client-section">
        <CardActions className="domain-form__client--details">
          <TextField
            id="clientId"
            label="Client Name"
            required
            value={client.clientId}
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
            onChange={value => handleChange('clientId', value)}
          />
          <TextField
            id="rootUrl"
            label="Root URL"
            required
            value={client.rootUrl}
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
            onChange={value => handleChange('rootUrl', value)}
          />
        </CardActions>
        <CardActions className="domain-form__selection">
          <SelectField
            id="description"
            label="Client Type"
            className="md-cell"
            value={client.description}
            menuItems={technology}
            onChange={value => handleChange('description', value)}
          />
          <a
            className="fa fa-minus-circle fa-2x domain-form__minus"
            onClick={() => removeClient(index)}
            aria-hidden="true"
          />
        </CardActions>
      </section>
    </div>
  );
};

DomainForm.propTypes = {
  index: PropTypes.number,
  handleChange: PropTypes.func,
  removeClient: PropTypes.func,
  client: PropTypes.object,
};

export default DomainForm;
