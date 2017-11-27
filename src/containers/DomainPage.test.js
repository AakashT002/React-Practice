import React from 'react';
import  DomainPage from './DomainPage';
import { mount } from 'enzyme';
import SessionStorage from '../__mocks__/mockSessionStorage';
import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';
import { Provider } from 'react-redux';

describe('Component: DomainPage', () => {
  window.sessionStorage = new SessionStorage();
  let domainPage;
  beforeEach(() => {
    sessionStorage.setItem('currentdomainName', 'sample domain');
    const wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <DomainPage />
      </Provider>
    );
    domainPage = wrapper.find(DomainPage);
  });

  it('renders without crashing', () => {
    expect(domainPage.exists()).toBe(true);
  });

  it('renders a proper card class css', () => {
    expect(domainPage.find('.card-centered').exists()).toBe(true);
  });

  it('renders the CLIENTS tab', () => {
    expect(domainPage.find('#domain-tab-0').exists()).toBe(true);
  });

  it('renders the ROLES tab', () => {
    expect(domainPage.find('#domain-tab-1').exists()).toBe(true);
  });

  it('renders the USERS tab', () => {
    expect(domainPage.find('#domain-tab-2').exists()).toBe(true);
  });

  it('renders the PLUS button', () => {
    expect(domainPage.find('.DomainPage__plus-icon').exists()).toBe(true);
  });

  it('renders the domain name', () => {
    expect(domainPage.find('.DomainPage__domain-name').text()
  ).toContain('sample domain');
  });
});

