import React from 'react';
import { shallow } from 'enzyme';
import SessionStorage from '../__mocks__/mockSessionStorage';
import Roles from './Roles';

describe('Component: Roles', () => {
  window.sessionStorage = new SessionStorage();
  const wrapper = shallow(<Roles />);
 
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a proper Roles form css', () => {
    expect(wrapper.find('.Roles__form').exists()).toBe(true);
  });

  it('renders a proper Roles remove button', () => {
    expect(wrapper.find('.Roles__button--remove').exists()).toBe(true);
  });

  it('renders a proper Roles save button', () => {
    expect(wrapper.find('.Roles__button--save').exists()).toBe(true);
  });

   it('renders the disabled save button on Roles listed form', () => {
    expect(wrapper.find('.Roles__button--save').props().disabled).toEqual(true);
  });
 
});