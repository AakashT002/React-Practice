import React from 'react';
import { shallow } from 'enzyme';

import ClientForm from './ClientForm';

describe('Component: ClientForm', () => {
  const client = {
    clientId: '',
    description: '',
    rootUrl: '',
  };
  const wrapper = shallow(<ClientForm client={client}/>);  

  it('renders a Client form', () => {
    expect(wrapper.find('.ClientForm').exists()).toBe(true);
  });

  it('renders a Client name', () => {
    expect(wrapper.find('.ClientForm__client-name').exists()).toBe(true);
  });

  it('renders a Client root url', () => {
    expect(wrapper.find('.ClientForm__root-url').exists()).toBe(true);
  });

  it('renders a Client type dropdown', () => {
    expect(wrapper.find('.ClientForm__select').exists()).toBe(true);
  });

  it('renders a remove button', () => {
    expect(wrapper.find('.ClientForm__remove').exists()).toBe(true);
  });

  it('renders a save form', () => {
    expect(wrapper.find('.ClientForm__save').exists()).toBe(true);
  });
});
