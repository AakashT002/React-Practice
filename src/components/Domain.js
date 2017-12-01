import React from 'react';
import { TextField } from 'react-md';
import PropTypes from 'prop-types';

import '../assets/stylesheets/Domain.css';

const Domain = ({ realm, info }) => {
  return (
    <div className="Domain">
      <TextField
        className="Domain__domain-info"
        disabled
        id={realm}
        label={realm}
        customSize="title"
        helpText={info}
      />
    </div>
  );
};

Domain.propTypes = {
  realm: PropTypes.string,
  info: PropTypes.string,
};

export default Domain;
