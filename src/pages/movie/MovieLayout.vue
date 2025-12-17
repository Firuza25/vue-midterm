<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, RouterView, useRoute } from "vue-router"

const route = useRoute()
const id = computed(() => route.params.id)
</script>

<template>
  <div class="layout">
    <div class="tabs">
      <RouterLink
        :to="`/movie/${id}`"
        class="tab"
        active-class="active"
        exact-active-class="active"
      >
        Overview
      </RouterLink>

      <RouterLink
        :to="`/movie/${id}/cast`"
        class="tab"
        active-class="active"
      >
        Cast
      </RouterLink>
    </div>

    <div class="tab-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 14px;
}

.tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tab {
  padding: 10px 14px;
  border-radius: 12px;
  text-decoration: none;
  color: rgba(255,255,255,0.85);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  transition: transform .15s ease, background .15s ease, border-color .15s ease;
}

.tab:hover {
  transform: translateY(-1px);
  background: rgba(255,255,255,0.07);
}

.tab.active {
  background: rgba(100,181,246,0.15);
  border-color: rgba(100,181,246,0.35);
  color: #d7ecff;
}

.tab-content {
  display: block;
}
</style>
