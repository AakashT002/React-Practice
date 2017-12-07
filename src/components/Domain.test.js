import React from 'react';
import { shallow } from 'enzyme';
import Domain from './Domain';

describe('Component: Domain', () => {
  const wrapper = shallow(<Domain />);

  it('renders domain component', () => {
    expect(wrapper.find('.Domain').exists()).toBe(true);
  });

  it('renders domain info in the component ', () => {
    expect(wrapper.find('.Domain__domain-info').exists()).toBe(true);
  });

  it('renders a info button for the domain ', () => {
    expect(wrapper.find('.Domain__button--info').exists()).toBe(true);
  });

  it('renders a edit button for the domain ', () => {
    expect(wrapper.find('.Domain__button--edit').exists()).toBe(true);
  });

  it('renders a save button for the domain ', () => {
    expect(wrapper.find('.Domain__button--save').exists()).toBe(true);
  });

  it('renders a delete button for the domain ', () => {
    expect(wrapper.find('.Domain__button--trash').exists()).toBe(true);
  });
});
