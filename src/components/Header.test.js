import React from 'react';
import { Provider } from 'react-redux';
import SessionStorage from '../__mocks__/mockSessionStorage';
import Header from './Header';
import { mount } from 'enzyme';
import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';

describe('Component: Header', () => {

  window.sessionStorage = new SessionStorage();
  let headerPage;
  beforeEach(() => {
    const wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <Header />
      </Provider>
    );
    headerPage = wrapper.find(Header);
  });

  it('renders without crashing', () => {
    expect(headerPage.exists()).toBe(true);
  });

  it('renders the page with class name', () => {
    expect(headerPage.find('.Header__toolbar').exists()).toBe(true);
  });

});
