import React from 'react';
import { shallow } from 'enzyme';

import Domain from './Domain';

describe('Component: Domain', () => {
  const wrapper = shallow(<Domain />);

  it('renders a proper division class css', () => {
    expect(wrapper.find('.Domain').exists()).toBe(true);
  });

  it('renders a proper text field class css', () => {
    expect(wrapper.find('.Domain__domain-info').exists()).toBe(true);
  });
});
