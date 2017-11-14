import React from 'react';
import { shallow } from 'enzyme';

import DomainForm from './DomainForm';

describe('Component: DomainForm', () => {
  const client = {
    clientId: '',
    description: '',
    rootUrl: '',
  };
  const wrapper = shallow(<DomainForm client={client}/>);  

  it('renders a Domain form', () => {
    expect(wrapper.find('.domain-form').exists()).toBe(true);
  });
});
