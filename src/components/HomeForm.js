import React from 'react';
import { Button } from 'react-md';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/stylesheets/HomeForm.css';
import PropTypes from 'prop-types';
import default_pic from '../assets/images/default_pic.jpg';

const HomeForm = ({ userName, handleCreateDomain, handleManageDomain }) => {
  return (
    <div className="HomeForm HomeForm--featured">
      <div className="HomeForm__user-info">
        <img src={default_pic} className="HomeForm_Img" alt={userName} />
        <br />
        <h2 className="HomeForm__heading">{`Hi, ${userName} !`}</h2>
      </div>
      <div className="HomeForm__user-options">
        <h1 className="HomeForm__heading">What would you like to do ?</h1>
        <br />
        <div className="HomeForm__create-domain">
          <Button
            floating
            className="fa fa-lg fa-pencil-square-o btn-createDomain"
            onClick={handleCreateDomain}
          />
          <br />
          <br />
          <h2 className="HomeForm__heading">Create New Application Domain</h2>
        </div>
        <div className="HomeForm__separator" />
        <span className="HomeForm__or-separator">or</span>
        <div className="HomeForm__separator" />
        <div className="HomeForm__manage-domain">
          <Button
            floating
            className="fa fa-lg fa-wrench btn-manageDomain"
            onClick={handleManageDomain}
          />
          <br />
          <br />
          <h2 className="HomeForm__heading">
            Manage Existing Application Domain
          </h2>
        </div>
      </div>
    </div>
  );
};

HomeForm.propTypes = {
  userName: PropTypes.string,
  handleCreateDomain: PropTypes.func,
  handleManageDomain: PropTypes.func,
};

export default HomeForm;
