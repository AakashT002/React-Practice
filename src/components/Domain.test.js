import React from 'react';
import { shallow } from 'enzyme';

import Domain from './Domain';
import DomainPreview from './DomainPreview';

describe('Component: Domain', () => {
  const wrapper = shallow(
    <Domain index={1} previewIndex={1} handlePreviewClick={() => {}} />
  );

  it('renders domain component', () => {
    expect(wrapper.find('.Domain').exists()).toBe(true);
  });

  it('renders domain info in the component ', () => {
    expect(wrapper.find('.Domain__domain-info').exists()).toBe(true);
  });

  it('renders a info button for the domain ', () => {
    expect(wrapper.find('.Domain__button--info').exists()).toBe(true);
  });

  it('renders a edit button for the domain ', () => {
    expect(wrapper.find('.Domain__button--edit').exists()).toBe(true);
  });

  it('renders a save button for the domain ', () => {
    expect(wrapper.find('.Domain__button--save').exists()).toBe(true);
  });

  it('renders a delete button for the domain ', () => {
    expect(wrapper.find('.Domain__button--trash').exists()).toBe(true);
  });

  it('renders DomainPreview component ', () => {
    expect(wrapper.find(DomainPreview).exists()).toBe(true);
  });

  it('should not render DomainPreview component ', () => {
    const wrapper = shallow(
      <Domain index={1} previewIndex={2} handlePreviewClick={() => {}} />
    );
    expect(wrapper.find(DomainPreview).exists()).toBe(false);
  });
});
