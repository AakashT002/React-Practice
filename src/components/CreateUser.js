import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'react-md/lib/TextFields';
import { Button, FontIcon } from 'react-md';
import '../assets/stylesheets/CreateUser.css';
import 'font-awesome/css/font-awesome.min.css';

const CreateUser = ({ index, users, handleChange, validateUser, removeUser, userValid, userCheck, validateEmail, emailValid }) => {
  const checkUser= () =>{
    if(userCheck) {
      if(userValid) {
        return(<FontIcon iconClassName="fa fa-check-circle-o domain-page__green" />);
      } else {
        return(<FontIcon iconClassName="fa fa-times-circle-o domain-page__red" />);
      }
    }

  };
 const checkEmail= () =>{
    if(userCheck) {
      if(emailValid) {
        return(<FontIcon iconClassName="fa fa-check-circle-o domain-page__green" />);
      } else {
        return(<FontIcon iconClassName="fa fa-times-circle-o domain-page__red" />);
      }
    }

  };
  return (
    <div>
      <section className="dividers__example md-paper md-paper--3 section__user">
        <div>
          <div>
        <TextField
          id="userName"
          label="Type User Name"
          placeholder="User Name"
          required
          value={users.username}
          className="md-cell md-cell--bottom login-form__input"
          inputClassName="font_size__normal"
          onChange={value => handleChange('username', value)}
          onBlur={(value) => validateUser(value)}
        />
         </div>
        <div className="createUser__check-icon">
      {checkUser()}
       </div>
      </div>
        <br />
        <div className="md-grid">
          <TextField
            id="firstName"
            label="First Name"
            placeholder="first Name"
            required
            value={users.firstName}
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
            onChange={value => handleChange('firstName', value)}
          />
          <TextField
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            required
            value={users.lastName}
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
            onChange={value => handleChange('lastName', value)}
          />
         
          <TextField
            id="email"
            placeholder="email"
            required
            value={users.email}
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
            label="Email Address"
            onChange={value => handleChange('email', value)}
            onBlur={(value) => validateEmail(value)}
          />
          
          <div className="createUser__check-email-icon">
           {checkEmail()}
           </div>
          <Button id='btnRemove' icon className="fa fa-minus-circle fa-2x login-form__remove-button"
          type='submit' onClick={() => removeUser(index)}></Button>
        </div>
      </section>
    </div>
  );
};

CreateUser.propTypes = {
  handleChange: PropTypes.func,
  index: PropTypes.number,
  users: PropTypes.object,
  removeUser: PropTypes.func,
  userValid: PropTypes.bool,
  validateUser: PropTypes.func,
  userCheck: PropTypes.bool,
  validateEmail: PropTypes.func,
  emailValid: PropTypes.bool,
};


export default CreateUser;