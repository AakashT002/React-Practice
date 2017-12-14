import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, TextField } from 'react-md';
import { TableRow, TableColumn } from 'react-md';

import DomainPreview from '../components/DomainPreview';

import '../assets/stylesheets/Domain.css';
import '../assets/stylesheets/DomainPreview.css';
import saveIcon from '../assets/images/Save.png';
import editONIcon from '../assets/images/Edit_ON.png';
import infoONIcon from '../assets/images/Info_ON.png';
import trashIcon from '../assets/images/TrashCan.png';

const Domain = ({
  clients,
  confirmDelete,
  domainPreview,
  handleChange,
  handleDomainPreviewClose,
  handleDomainPreviewNext,
  handleDomainPreviewPrevious,
  handleIconClick,
  handlePreviewClick,
  index,
  previewIndex,
  realm,
  roles,
  tabIndexInPreview,
  users
}) => {
  return (
    <div className="Domain">
      <TableRow>
        <TableColumn>
          <Avatar
            key={realm}
            suffix="pink"
            onClick={handleIconClick && handleIconClick.bind(this, realm)}
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
              (clients ? clients.length : 0) +
              ' clients \u2022 ' +
              (roles ? roles.length : 0) +
              ' roles \u2022 ' +
              (users ? users.length : 0) +
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
              onClick={handlePreviewClick.bind(this, index)}
            />
            <img
              src={trashIcon}
              alt="Delete"
              className={
                realm === 'master'
                  ? 'Domain__buttons--all Domain__button--trash not-clickable'
                  : 'Domain__buttons--all Domain__button--trash'
              }
              onClick={
                confirmDelete && realm !== 'master'
                  ? confirmDelete.bind(this, index, realm)
                  : null
              }
            />
          </div>
        </TableColumn>
      </TableRow>
      {index === previewIndex &&
        <DomainPreview
          index={index}
          domainPreview={domainPreview}
          handleDomainPreviewClose={handleDomainPreviewClose}
          handleDomainPreviewPrevious={handleDomainPreviewPrevious}
          handleDomainPreviewNext={handleDomainPreviewNext}
          tabIndexInPreview={tabIndexInPreview}
        />}
      <hr className="Domain__divider" />
    </div>
  );
};

Domain.propTypes = {
  clients: PropTypes.array,
  confirmDelete: PropTypes.func,
  domainPreview: PropTypes.object,
  handleChange: PropTypes.func,
  handleDomainPreviewClose: PropTypes.func,
  handleDomainPreviewNext: PropTypes.func,
  handleDomainPreviewPrevious: PropTypes.func,
  handleIconClick: PropTypes.func,
  handlePreviewClick: PropTypes.func,
  index: PropTypes.number,
  previewIndex: PropTypes.number,
  realm: PropTypes.string,
  roles: PropTypes.array,
  tabIndexInPreview: PropTypes.number,
  users: PropTypes.array,
};

export default Domain;
