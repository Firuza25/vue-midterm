<script setup lang="ts">
import { computed } from "vue"
import { RouterView, RouterLink, useRoute } from "vue-router"

const route = useRoute()
const id = computed(() => route.params.id)
</script>

<template>
  <div style="display:grid; gap:12px;">
    <!-- Tabs -->
    <div style="display:flex; gap:10px; flex-wrap:wrap;">
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

    <!-- Nested content -->
    <RouterView />
  </div>
</template>

<style scoped>
.tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--muted);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.2s ease;
}

.tab:hover {
  color: var(--text);
  background: rgba(255,255,255,0.10);
}

.tab.active {
  color: var(--text);
  background: rgba(100, 181, 246, 0.18);
  border-color: rgba(100, 181, 246, 0.35);
}
</style>