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

  it('renders a proper Roles form', () => {
    expect(wrapper.find('.Roles__form').exists()).toBe(true);
  });

  it('renders the buttons for the Roles form', () => {
    expect(wrapper.find('.Roles__buttons').exists()).toBe(true);
  });

  it('renders a placeholder for message when action is performed on the role form', () => {
    expect(wrapper.find('.Roles__message').exists()).toBe(true);
  });
});