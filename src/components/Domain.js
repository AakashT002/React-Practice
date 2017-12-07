import React from 'react';
import { Avatar, TextField } from 'react-md';

import PropTypes from 'prop-types';
import { TableRow, TableColumn } from 'react-md';

import '../assets/stylesheets/Domain.css';
import saveIcon from '../assets/images/Save.png';
import editONIcon from '../assets/images/Edit_ON.png';
import infoONIcon from '../assets/images/Info_ON.png';
import trashIcon from '../assets/images/TrashCan.png';

const Domain = ({
  realm,
  index,
  handleIconClick,
  clients,
  users,
  roles,
  removeRealm,
  handleChange,
}) => {
  return (
    <div className="Domain">
      <TableRow>
        <TableColumn>
          <Avatar
            key={realm}
            suffix="pink"
            onClick={
              handleIconClick
                ? handleIconClick.bind(this, realm)
                : alert('no function passed')
            }
          >
            {realm && realm.length > 0 ? realm.charAt(0).toUpperCase() : '?'}
          </Avatar>
        </TableColumn>
        <TableColumn className="Domain__domain-info-col">
          <TextField
            className="Domain__domain-info"
            disabled={realm && realm.length > 0}
            id={`id ${realm}`}
            label={realm}
            customSize="title"
            onChange={() => handleChange()}
            helpText={
              (clients ? clients : 0) +
              ' clients \u2022 ' +
              (roles ? roles : 0) +
              ' roles \u2022 ' +
              (users ? users : 0) +
              ' users'
            }
          />
        </TableColumn>
        <TableColumn>
          <div className="Domain__domain-buttons1-col">
            <img
              src={saveIcon}
              alt="Save"
              className="Domain__buttons--all Domain__button--save"
            />
            <img
              src={editONIcon}
              alt="Edit"
              className="Domain__buttons--all Domain__button--edit"
            />
            <img
              src={infoONIcon}
              alt="Preview"
              className="Domain__buttons--all Domain__button--info"
            />
            <img
              src={trashIcon}
              alt="Delete"
              className="Domain__buttons--all Domain__button--trash"
              onClick={() => removeRealm(index, realm)}
            />
          </div>
        </TableColumn>
      </TableRow>
      <hr className="Domain__divider" />
    </div>
  );
};

Domain.propTypes = {
  realm: PropTypes.string,
  handleIconClick: PropTypes.func,
  clients: PropTypes.number,
  users: PropTypes.number,
  roles: PropTypes.number,
  removeRealm: PropTypes.func,
  index: PropTypes.number,
  handleChange: PropTypes.func,
};

export default Domain;
