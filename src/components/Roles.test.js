import React from 'react';
import { shallow } from 'enzyme';
import SessionStorage from '../__mocks__/mockSessionStorage';
import Roles from './Roles';

describe('Component: Roles', () => {
  const spy = jest.fn();
  window.sessionStorage = new SessionStorage();
  const wrapper = shallow(<Roles />);
  function RolesWrapper(event) {
    if (event === 'change') {
      const wrapper = shallow(<Roles roleName="role" onChange={spy} />);
      return wrapper;
    } else if (event === 'save') {
      const wrapper = shallow(<Roles roleName="role" onRoleSave={spy} />);
      return wrapper;
    }
  }
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a proper Roles form', () => {
    expect(wrapper.find('.RolesForm__role-section').exists()).toBe(true);
  });

  it('renders the save button for the Roles form', () => {
    expect(wrapper.find('.RolesForm__save').exists()).toBe(true);
  });

  it('renders the remove button for the Roles form', () => {
    expect(wrapper.find('.RolesForm__remove').exists()).toBe(true);
  });

  it('renders the proper role detail for Roles', () => {
    expect(wrapper.find('.RolesForm__role--detail').exists()).toBe(true);
  });

  it('renders a placeholder for message when action is performed on the role form', () => {
    expect(wrapper.find('.Roles__message').exists()).toBe(true);
  });

  it('should enable the save button when a valid role is provided', () => {
    const saveButton = RolesWrapper('change').find('.RolesForm__save');
    expect(saveButton.props().disabled).toEqual(true);
  });

  it('should call onClick when the save button is clicked', () => {
    const saveButton = RolesWrapper('save').find('.RolesForm__save');
    saveButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
