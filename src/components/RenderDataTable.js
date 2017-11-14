import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-md';
import { Card, CardText } from 'react-md';
import { DataTable, TableBody, TableRow, TableColumn } from 'react-md';

const RenderDataTable = ({
  domainCardHeaderText,
  domainList,
  handleClientClick,
  handleUserClick,
}) => {
  return (
    <Card className="md-block-centered">
      <h1 className="DomainTable__card--header">{domainCardHeaderText}</h1>
      <CardText>
        <DataTable plain className="DomainTable__table">
          <TableBody>
            {domainList.map((domain, i) => (
              <TableRow key={i}>
                <TableColumn>
                  <div className="DomainTable__table--column">
                    {domain.realm}
                  </div>
                </TableColumn>
                <TableColumn>
                  <Button flat primary swapTheming onClick={handleClientClick}>
                    Clients
                  </Button>
                  <span className="DomainTable__table--userButton">
                    <Button flat primary swapTheming onClick={handleUserClick}>
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
};

RenderDataTable.propTypes = {
  domainList: PropTypes.array,
  domainCardHeaderText: PropTypes.string,
  handleRegisterClick: PropTypes.func,
  handleClientClick: PropTypes.func,
  handleUserClick: PropTypes.func,
};

export default RenderDataTable;
