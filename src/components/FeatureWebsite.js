import Button from 'react-md/lib/Buttons';
import PropTypes from 'prop-types';
import React from 'react';

const FeatureWebsite = ({ website }) => (
  <Button raised primary href={website} target="_blank">
    Visit Website
  </Button>
);

FeatureWebsite.propTypes = {
  website: PropTypes.string,
};
export default FeatureWebsite;
