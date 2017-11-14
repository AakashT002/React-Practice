import React from 'react';
import { shallow } from 'enzyme';
import CreateUser from './CreateUser';

describe('Component: CreateUser', () => {
const spy = jest.fn();
const users = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  };
  const wrapper = shallow(<CreateUser users={users}/>);

  function loginWrapper(event) {
    if (event === 'submit') {
      const wrapper = shallow(<CreateUser users={users} removeUser={spy} />);
      return wrapper;
    }
  }

  it('renders a proper homepage heading css', () => {
    expect(wrapper.find('.section__user').exists()).toBe(true);
  });

  it('should call create domain screen when the createdomain button is clicked', () => {
    const submitButton = loginWrapper('submit').find('.login-form__remove-button');
    submitButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});

