import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'react-md';

import RenderDataTable from './RenderDataTable';
import RenderEmptyData from './RenderEmptyData';

import spinner from '../assets/images/spinner.gif';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/stylesheets/DomainTable.css';

const domainCardHeaderText = 'Manage Application Domain';

const DomainTable = ({
  domainList,
  requesting,
  handleRegisterClick,
  handleClientClick,
  handleUserClick,
}) => {
  if (domainList && domainList.length > 0) {
    return (
      <div className="md-block-centered DomainTable__card">
        <RenderDataTable
          domainCardHeaderText={domainCardHeaderText}
          domainList={domainList}
          handleClientClick={handleClientClick}
          handleUserClick={handleUserClick}
        />
      </div>
    );
  } else if (!requesting) {
    return (
      <div className="md-block-centered DomainTable__card">
        <RenderEmptyData
          domainCardHeaderText={domainCardHeaderText}
          handleRegisterClick={handleRegisterClick}
        />
      </div>
    );
  } else {
    return (
      <Card className="md-block-centered DomainTable__card--nodomain  ">
        <h1 className="DomainTable__card--header">{domainCardHeaderText}</h1>
        <CardText>
          <img src={spinner} alt={''} />
        </CardText>
      </Card>
    );
  }
};

DomainTable.propTypes = {
  domainList: PropTypes.array,
  requesting: PropTypes.bool,
  handleRegisterClick: PropTypes.func,
  handleClientClick: PropTypes.func,
  handleUserClick: PropTypes.func,
};

export default DomainTable;
