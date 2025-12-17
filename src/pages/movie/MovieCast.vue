<script setup lang="ts">
import { useRoute } from "vue-router"
import { useMovieDetails } from "../../composables/useTmdb"

const route = useRoute()
const id = Number(route.params.id)
const { data, isLoading } = useMovieDetails(id)
</script>

<template>
  <div v-if="isLoading">Loading cast...</div>
  <div v-else>
    <div
      v-for="c in (data?.credits?.cast || []).slice(0, 20)"
      :key="c.id"
      style="margin-bottom:6px"
    >
      {{ c.name }} — {{ c.character }}
    </div>
  </div>
</template>