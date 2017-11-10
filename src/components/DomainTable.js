import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-md';
import '../assets/stylesheets/DomainTable.css';
import { Card, CardText } from 'react-md';
import { DataTable, TableBody, TableRow, TableColumn } from 'react-md';

const domainCardHeaderText = 'Manage Application Domain';

const DomainTable = ({
  domainList,
  handleRegisterClick,
  handleClientClick,
  handleUserClick,
}) => {
  function renderDataTable() {
    return (
      <Card className="md-block-centered">
        <h1 className="DomainTable__card--header">{domainCardHeaderText}</h1>
        <CardText>
          <DataTable plain className="DomainTable__table">
            <TableBody>
              {domainList.map((domain, i) => (
                <TableRow key={i}>
                  <TableColumn>{domain.realm}</TableColumn>
                  <TableColumn>
                    <Button
                      flat
                      primary
                      swapTheming
                      onClick={handleClientClick}
                    >
                      Clients
                    </Button>
                    <span className="DomainTable__table--userButton">
                      <Button
                        flat
                        primary
                        swapTheming
                        onClick={handleUserClick}
                      >
                        Users
                      </Button>
                    </span>
                  </TableColumn>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </CardText>
      </Card>
    );
  }

  function renderEmptyData() {
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
  }

  if (domainList && domainList.length > 0) {
    return (
      <div className="md-block-centered DomainTable__card">
        {renderDataTable()}
      </div>
    );
  } else {
    return (
      <div className="md-block-centered DomainTable__card">
        {renderEmptyData()}
      </div>
    );
  }
};

DomainTable.propTypes = {
  domainList: PropTypes.array,
  handleRegisterClick: PropTypes.func,
  handleClientClick: PropTypes.func,
  handleUserClick: PropTypes.func,
};

export default DomainTable;
