import React from 'react';
import { Provider } from 'react-redux';
import HomePage from './HomePage';
import { mount } from 'enzyme';
import SessionStorage from '../__mocks__/mockSessionStorage';
import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';

describe('Component: HomePage', () => {
  window.sessionStorage = new SessionStorage();
  let homePage;
  beforeEach(() => {
    const wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <HomePage />
      </Provider>
    );
    homePage = wrapper.find(HomePage);
  });

  it('renders without crashing', () => {
    expect(homePage.exists()).toBe(true);
  });

});
