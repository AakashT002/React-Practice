import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-md';
import { Card, CardText } from 'react-md';

const RenderEmptyData = ({ domainCardHeaderText, handleRegisterClick }) => {
  return (
    <Card className="md-block-centered DomainTable__card--nodomain  ">
      <h1 className="DomainTable__card--header">{domainCardHeaderText}</h1>
      <CardText>
        <h2 className="DomainTable__card--header">
          No Applications to manage{' '}
        </h2>
        <Button flat primary swapTheming onClick={handleRegisterClick}>
          Create New Domain
        </Button>
      </CardText>
    </Card>
  );
};

RenderEmptyData.propTypes = {
  domainCardHeaderText: PropTypes.string,
  handleRegisterClick: PropTypes.func,
};

export default RenderEmptyData;
