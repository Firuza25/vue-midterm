import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from '../src/components/MovieCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/movie/:id', component: { template: '<div />' } },
  ],
})


describe('MovieCard', () => {
  it('renders movie title', async () => {
    const wrapper = mount(MovieCard, {
      global: {
        plugins: [
          router,
          createTestingPinia(),
        ],
      },
      props: {
        movie: {
          id: 1,
          title: 'Test Movie',
          vote_average: 7.5,
        },
      },
    })

    expect(wrapper.text()).toContain('Test Movie')
  })
})
