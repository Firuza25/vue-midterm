import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '../src/stores/favorites'

describe('Favorites Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds and removes favorite movie', () => {
    const store = useFavoritesStore()

    store.toggle({ id: 1, title: 'Movie' })
    expect(store.count).toBe(1)

    store.toggle({ id: 1 })
    expect(store.count).toBe(0)
  })
})
