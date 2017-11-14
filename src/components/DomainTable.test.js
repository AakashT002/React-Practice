import React from 'react';
import { shallow } from 'enzyme';
import DomainTable from './DomainTable';

describe('Component: DomainTable', () => {
  const wrapper = shallow(<DomainTable />);

  it('renders a proper card alignment class css', () => {
    expect(wrapper.find('.md-block-centered').exists()).toBe(true);
  });

  it('renders a proper card class css', () => {
    expect(wrapper.find('.DomainTable__card').exists()).toBe(true);
  });
});
