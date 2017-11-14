import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'react-md';
import CreateUser from '../components/CreateUser';
import { handleUserCreation, handleUserDeletion, handleUserValidation} from '../store/addUser/action';
import {handleEmailValidation, setResponseHeader  } from '../store/addUser/action';
import PropTypes from 'prop-types';
import '../assets/stylesheets/CreateUser.css';

class CreateUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formCount: ['input-0'],
      users: [{
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        enabled: true,
        credentials: [{
          type: 'password',
          value: 'password'
        }]
      }],
    };
  }

  render() {
    const { users } = this.state;
    return (
      <div className="CreateUser">
        <Card className="CreateUser__Card--featured">
          <div className="CreateUser__createUser">
            <div className="CreateUser__register-heading">
              <label className="CreateUser__register-label">Register Users</label>
              <br />
            </div>
          </div>

          <div >
            {users.map((_, i) => (
              <CreateUser key={i}
                index={i}
                users={users[i]}
                handleChange={(name, value) => this.setState(() => {
                  let newUsers = this.state.users;
                  let newUser = this.state.users[i];
                  newUser[name] = value;
                  newUsers[i] = newUser;
                  return {
                    users: newUsers
                  };
                })}
                validateUser={() => this.validateUser(this.state.users[i].username)}
                removeUser={i => this.removeUser(i)}
                userValid={this.props.userValid}
                userCheck={users.length-1 === i ? true : false}
                validateEmail={() => this.validateEmail(this.state.users[i].email)}
                emailValid={this.props.emailValid}
              />
            ))}
          </div>

          <div className="CreateUser__button-save">
            <Button
              disabled={!(this.props.userValid && this.props.emailValid)}
              flat
              label="Add User"
              className="CreateUser__button-AddUser"
              onClick={() => this.appendInput()}
            />
            <Button
              flat
              className="CreateUser__button-AddUser"
              label="Cancel"
              onClick={() => this.cancelButton()}
            />
          </div>
          <div>
            <br />
            <br />
          </div>
        </Card>
      </div>
    );
  }

  removeUser(index) {
    const str = this.props.responseHeaderArray[index];
    const users = Object.assign([], this.state.users);
    users.splice(index, 1);
    this.setState({ users });
    this.props.dispatch(handleUserDeletion(str, index));
  }

  cancelButton() {
    sessionStorage.removeItem('manageUserForDomainName');
    this.props.history.push('/home');
  }


  validateUser(username) {
    let realmName = (sessionStorage.manageUserForDomainName);
    this.props.dispatch(handleUserValidation(username, realmName));
  }

    validateEmail(email) {
    let realmName = (sessionStorage.manageUserForDomainName);
    this.props.dispatch(handleEmailValidation(email, realmName));
  }

  appendInput() {
   this.props.dispatch(setResponseHeader());
    let user = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      enabled: true,
      credentials: [{
        type: 'password',
        value: 'password'
      }]
    };
    this.setState({ users: this.state.users.concat([user]) });
    let realm = sessionStorage.manageUserForDomainName;
    this.props.dispatch(handleUserCreation(realm, this.state.users[this.state.users.length - 1]));

  }

  formValid() {
    return (
      this.validatePresence(this.state.username) &&
      this.validatePresence(this.state.firstName) &&
      this.validatePresence(this.state.lastName) &&
      this.validatePresence(this.state.email)
    );
  }

  validatePresence(value) {
    return value.toString().length > 0;
  }
}

CreateUserPage.propTypes = {
  history: PropTypes.object,
  users: PropTypes.array,
  dispatch: PropTypes.func,
  domainName: PropTypes.string,
  responseHeader: PropTypes.string,
  responseHeaderArray: PropTypes.array,
  formValid: PropTypes.func,
  userValid: PropTypes.bool,
  emailValid: PropTypes.bool,
};


function mapStateToProps(state) {
  return {
    responseHeader: state.addUser.responseHeader,
    responseHeaderArray: state.addUser.responseHeaderArray,
    domainName: state.domain.domainName,
    userValid: state.addUser.userValid,
    emailValid: state.addUser.emailValid,
  };
}

export default connect(mapStateToProps)(CreateUserPage);