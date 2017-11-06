import React from 'react';
import { shallow } from 'enzyme';

import SessionStorage from '../__mocks__/mockSessionStorage';
import HomeForm from './HomeForm';

describe('Component: HomeForm', () => {
  const spy = jest.fn();
  window.sessionStorage = new SessionStorage();
  const wrapper = shallow(<HomeForm />);

  function loginWrapper(event) {
    if (event === 'submit') {
      const wrapper = shallow(<HomeForm handleCreateDomain={spy} />);
      return wrapper;
    }
  }

  it('renders a proper homepage heading css', () => {
    expect(wrapper.find('.HomeForm__heading').exists()).toBe(true);
  });

  it('should call create domain screen when the createdomain button is clicked', () => {
    const submitButton = loginWrapper('submit').find('.btn-createDomain');
    submitButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
