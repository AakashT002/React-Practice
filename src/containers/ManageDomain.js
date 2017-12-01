import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import {
  Card,
  Button,
  FontIcon,
  DataTable,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';

import Domain from '../components/Domain';

import {
  loadDomains,
  getUser,
  getClient,
  getRole,
} from '../store/domain/action';

import '../assets/stylesheets/ManageDomain.css';

export class ManageDomain extends Component {
  constructor(props) {
    super(props);

    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleIconClick() {
    this.props.history.push('./register-domain');
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(loadDomains()).then(() => {
      this.props.domainList.map(realm => {
        const { domainList } = this.props;
        
        dispatch(getUser(domainList, realm.realm));
        dispatch(getClient(domainList, realm.realm));
        dispatch(getRole(domainList, realm.realm));

        return realm;
      });
    });
  }
  
  render() {
    const { domainList, requesting } = this.props;
    if (domainList && domainList.length > 0) {
      return (
        <div className="ManageDomainPage">
          <h1 className="ManageDomainPage__domain-name">Manage Domains</h1>
          <Card className="card-block-centered">
            <div className="ManageDomainPage__domain-numbers">
              <h3 className="ManageDomain__domain-text">
                {domainList.length} DOMAINS
              </h3>
              <Button floating className="fa fa-plus plus-icon" />
            </div>
            <DataTable plain className="ManageDomainPage__domain-list">
              <TableBody>
                {domainList.map(realm => {
                  return (
                    <TableRow key={realm.realm}>
                      <TableColumn>
                        <div className="ManageDomainPage__icon-bg">
                          <FontIcon
                            className="ManageDomainPage__icon"
                            onClick={this.handleIconClick}
                          >
                            {realm.realm.slice(0, 1).toUpperCase()}
                          </FontIcon>
                        </div>
                      </TableColumn>
                      <TableColumn>
                        <Domain
                          key={realm.realm}
                          realm={realm.realm}
                          info={` ${realm.clients ||
                            '0 ' ||
                            'fetching ...'} clients \u2022 ${realm.roles ||
                            '0' ||
                            'fetching ...'} roles \u2022 ${realm.users ||
                            '0' ||
                            'fetching ...'} users`}
                        />
                      </TableColumn>
                      <TableColumn>
                        <Button floating className="fa fa-info " />
                        <Button floating className="fa fa-trash-o " />
                      </TableColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
            </DataTable>
          </Card>
        </div>
      );
    } else if (!requesting) {
      return <div>No Domains </div>;
    } else {
      return (
        <div className="ManageDomainPage">
          <h1 className="ManageDomainPage__domain-name">Manage Domains</h1>
          <Card className="card-block-centered">
            <div className="ManageDomainPage__domain-numbers">
              <h3 className="ManageDomain__domain-text">0 DOMAINS</h3>
              <Button floating className="fa fa-plus plus-icon" />
            </div>
            <div className="ManageDomain__spinner-div">
              <SyncLoader color={'#BC477B'} loading={true} />
            </div>
          </Card>
        </div>
      );
    }
  }
}

ManageDomain.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
  domainList: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    domainList: state.domain.domainList,
    requesting: state.domain.requesting,
  };
}

export default connect(mapStateToProps)(ManageDomain);
