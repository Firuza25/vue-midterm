import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterBar from '../src/components/FilterBar.vue'

describe('FilterBar', () => {
  it('emits update when input changes', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        genres: [],
        modelValue: {
          query: '',
          sortBy: 'popularity.desc',
        },
      },
    })

    const input = wrapper.find('input')
    await input.setValue('Matrix')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
