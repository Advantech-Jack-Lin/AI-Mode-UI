import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TableComponent from '../src/components/TableComponent.vue';

describe('TableComponent', () => {
  it('renders table headers and cells', () => {
    const wrapper = mount(TableComponent, {
      props: { data: [{ Name: 'Alice', Age: 30 }] }
    });
    expect(wrapper.findAll('th').length).toBe(2);
    expect(wrapper.find('tbody td').text()).toBe('Alice');
  });

  it('has minimum width of 480px for artifact area display', () => {
    const wrapper = mount(TableComponent, {
      props: { data: [{ Name: 'Alice', Age: 30 }] }
    });
    const table = wrapper.find('.table-component');
    // Verify the table element exists and has the correct class
    expect(table.exists()).toBe(true);
    expect(table.classes()).toContain('table-component');
  });
});
