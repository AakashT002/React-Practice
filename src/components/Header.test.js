import React from 'react';
import { shallow } from 'enzyme';

import SessionStorage from '../__mocks__/mockSessionStorage';
import Header from './Header';

describe('Component: Header', () => {
  window.sessionStorage = new SessionStorage();
  const wrapper = shallow(<Header />);

  it('renders a Toolbar', () => {
    expect(wrapper.find('.Header-toolbar').exists()).toBe(true);
  });
});
