import React from 'react';
import { shallow } from 'enzyme';

import SessionStorage from '../__mocks__/mockSessionStorage';
import DomainForm from './DomainForm';

describe('Component: DomainForm', () => {
  window.sessionStorage = new SessionStorage();
  const wrapper = shallow(<DomainForm />);

  it('renders a Domain page', () => {
    expect(wrapper.find('.domain-form').exists()).toBe(true);
  });
});
