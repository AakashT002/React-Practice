import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'react-md/lib/TextFields';
import { Button, FontIcon } from 'react-md';
import '../assets/stylesheets/CreateUser.css';
import 'font-awesome/css/font-awesome.min.css';

const CreateUser = ({ index, users, handleChange, validateUser, removeUser, userValid, userCheck, validateEmail, emailValid,saveInput,chkFlag }) => {
  const checkUser= () =>{
    if(userCheck && users.username !== '' && chkFlag) {
      if(userValid) {
        return(<FontIcon iconClassName="fa fa-check-circle-o domain-page__green" />);
      } else {
        return(<FontIcon iconClassName="fa fa-times-circle-o domain-page__red" />);
      }
  }
  };

 const checkEmail= () =>{
    if(userCheck && users.email !== '' && chkFlag) {
      if(emailValid) {
        return(<FontIcon iconClassName="fa fa-check-circle-o domain-page__green" />);
      } else {
        return(<FontIcon iconClassName="fa fa-times-circle-o domain-page__red" />);
      }
    }
  };
  
   const checkAddButton= () =>{
      if(userCheck) { 
        if(!(userValid && emailValid))
        {
        return ( 
       <Button id='btnAdd' icon className="fa fa-floppy-o fa-2x login-form__remove-button-disbaled"
       disabled={!(userValid && emailValid)}
       type='submit' onClick={() => saveInput()}></Button>);
        }
        else
        {
        return ( 
        <Button id='btnAdd' icon className="fa fa-floppy-o fa-2x login-form__save-button"
        disabled={!(userValid && emailValid)}
        type='submit' onClick={() => saveInput()}></Button>);
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
          disabled={!userCheck}
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
       <div>
         <div className="createUser__check-email-text">
        <TextField
            id="email"
            placeholder="email"
            required
            disabled={!userCheck}
            value={users.email}
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
            label="Email Address"
            onChange={value => handleChange('email', value)}
            onBlur={(value) => validateEmail(value)}
          />
          </div>
          <div className="createUser__check-email-icon">
           {checkEmail()}
         </div>
        <div>
          <div className="createUser__add-button">
          {checkAddButton()}
           </div>
          <div className="createUser__remove-button">
            <Button id='btnRemove' icon className="fa fa-minus-circle fa-2x login-form__remove-button"
            type='submit' onClick={() => removeUser(index)}></Button>
           </div>
          </div>
        </div>
        <br />
        <div className="md-grid">
          <TextField
            id="firstName"
            label="First Name"
            placeholder="first Name"
            value={users.firstName}
            disabled={!userCheck}            
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
            onChange={value => handleChange('firstName', value)}
          />
          <TextField
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            value={users.lastName}
            disabled={!userCheck}            
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
            onChange={value => handleChange('lastName', value)}
          />
           </div>
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
  dispatch: PropTypes.func,
  saveInput: PropTypes.func,
  chkFlag: PropTypes.bool,
};

export default CreateUser;