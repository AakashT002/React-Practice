import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, TextField, Button, SelectField, Checkbox, IconSeparator, Avatar } from 'react-md';
import '../assets/stylesheets/TeamForm.css';
import { ASSIGN_DOMAINS } from '../utils/constants';
import '../assets/stylesheets/ClientForm.css';

const TeamForm = ({ team, handleTeamChange, index, validateTeamForm, isTeamSaved, onTeamSave, isError, teamFeedbackjMessage, showAsSaved }) => {

  const domainCheckList = () => {
    return ASSIGN_DOMAINS.map((domain, i) => {
      return (
        <Checkbox
          name={domain}
          id={domain}
          label={domain}
          value={domain}
          key={i}
        // onChange={value =>
        //   handleRoleChange('ischecked', value, role.name, index, i)}
        // checked={ischecked}
        />
      );
    });
  };

  const renderMessageForTeam = () => {
    if (!isError) {
      return (
        <IconSeparator
          label={teamFeedbackjMessage}
          iconBefore
          className="ClientForm__register-pass"
        >
          <Avatar
            icon={<i className="material-icons ClientForm__saved-icon">done</i>}
            suffix="white"
          />
        </IconSeparator>
      );
    } else {
      return (
        <IconSeparator
          label={teamFeedbackjMessage}
          iconBefore
          className="ClientForm__register-fail"
        >
          <Avatar
            icon={
              <i className="material-icons ClientForm__saved-icon">clear</i>
            }
            suffix="white"
          />
        </IconSeparator>
      );
    }
  };


  return (
    <div className="TeamForm">
      <div className="TeamForm__forms-section">
        <section className="TeamForm__team-section">
          <CardActions className="TeamForm__team--detail" id="TeamForm_div">
            <TextField
              //disabled={disableButton === undefined || disableButton === true}
              id="team"
              required
              //label={isDirty ? 'New Team Name' : ''}
              className="md-cell  TeamForm__team-name"
              value={team.name}
              //ref={index === 0 ? inputRef : null}
              onChange={value => handleTeamChange(value, index)}
            />
            <SelectField
              id="domains"
              label="Assign Domain(s)"
              required
              className="md-cell TeamForm__select"
              value=""
              menuItems={domainCheckList()}
            //onChange={value => handleFieldChange('description', value)}
            />
          </CardActions>
          <CardActions className="TeamForm__bottom-section">
            {showAsSaved === true && renderMessageForTeam()}
            <Button
              className="TeamForm__save"
              disabled={!validateTeamForm(index) || isTeamSaved === true}
              flat
              onClick={() => onTeamSave(index)}
            >
              SAVE
            </Button>
            <Button
              className="TeamForm__remove"
              flat
            //onClick={() => confirmRoleDelete(index, roleId)}
            >
              REMOVE
            </Button>
          </CardActions>
        </section>
      </div>
    </div>
  );
};

TeamForm.propTypes = {
  team: PropTypes.object,
};

export default TeamForm;
