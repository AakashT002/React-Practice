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
    expect(wrapper.find('.client-form').exists()).toBe(true);
  });
});
