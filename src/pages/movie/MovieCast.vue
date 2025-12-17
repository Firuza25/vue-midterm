<script setup lang="ts">
import { useRoute } from "vue-router"
import { useMovieDetails } from "../../composables/useTmdb"

const route = useRoute()
const id = Number(route.params.id)

const { data, isLoading, error } = useMovieDetails(id)
</script>

<template>
  <div v-if="error" class="empty">{{ error }}</div>

  <div v-else-if="isLoading">Loading cast...</div>

  <div v-else class="cast">
    <div
      v-for="c in (data?.credits?.cast || []).slice(0, 20)"
      :key="c.id"
      class="cast-row"
    >
      <strong>{{ c.name }}</strong>
      <span class="muted">— {{ c.character }}</span>
    </div>
  </div>
</template>

<style scoped>
.cast { display: grid; gap: 8px; }
.cast-row { padding: 10px 12px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); }
.muted { color: var(--muted); }
</style>
