import React from 'react';
import PropTypes from 'prop-types';
import { CardText, TextField, Button, Paper } from 'react-md';
import '../assets/stylesheets/Roles.css';

const Roles = ({
  handleChange,
  index,
  onRoleSave,
  checkRole,
  roleName,
  roleId,
  isDirty,
  disableButton,
  inputRef,
  confirmRoleDelete,
}) => {
  return (
    <Paper className="Roles_rectangle">
      <div className="Roles__form" id="Roles_div">
        <CardText>
          <TextField
            disabled={!!roleId || disableButton === true}
            id="role"
            required
            value={roleName}
            ref={index === 0 ? inputRef : null}
            onChange={value => handleChange(value, index)}
          />
        </CardText>
        <div className="Roles__message">
          {isDirty === false ? checkRole(index) : null}
        </div>
        <div className="Roles__buttons">
          <Button
            className="Roles__button"
            disabled={
              !!roleId ||
              !(!!roleName && roleName.length > 0) ||
              disableButton === true
            }
            flat
            primary
            onClick={() => onRoleSave(index)}
          >
            SAVE
          </Button>
          <Button
            className="Roles__button"
            flat
            primary
            onClick={() => confirmRoleDelete(index, roleId)}
          >
            REMOVE
          </Button>
        </div>
      </div>
    </Paper>
  );
};

Roles.propTypes = {
  handleChange: PropTypes.func,
  index: PropTypes.number,
  onRoleSave: PropTypes.func,
  checkRole: PropTypes.func,
  roleValid: PropTypes.bool,
  roleName: PropTypes.string,
  roleId: PropTypes.string,
  isDirty: PropTypes.bool,
  disableButton: PropTypes.bool,
  inputRef: PropTypes.object,
  confirmRoleDelete: PropTypes.func,
};

export default Roles;
