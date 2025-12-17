import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RatingStars from '../src/components/RatingStars.vue'

describe('RatingStars', () => {
  it('renders stars based on rating', () => {
    const wrapper = mount(RatingStars, {
      props: {
        value: 8,
      },
    })

    expect(wrapper.text()).toContain('8.0')
  })
})
