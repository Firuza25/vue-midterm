<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { useMovieDetails } from "../../composables/useTmdb"
import { imgBackdrop, imgPoster, yearOf } from "../../utils/format"
import TrailerModal from "../../components/TrailerModal.vue"
import RatingStars from "../../components/RatingStars.vue"
import { useFavoritesStore } from "../../stores/favorites"

const route = useRoute()
const id = Number(route.params.id)

const { data, isLoading, error, trailerKey } = useMovieDetails(id)
const showTrailer = ref(false)

const poster = computed(() => imgPoster(data.value?.poster_path, "w500"))
const backdrop = computed(() => imgBackdrop(data.value?.backdrop_path, "w1280"))
const year = computed(() => yearOf(data.value?.release_date))

const favoritesStore = useFavoritesStore()

/* Reviews logic */
const expandedReviews = ref<Record<string, boolean>>({})

function isExpanded(id: string) {
  return !!expandedReviews.value[id]
}

function toggleReview(id: string) {
  expandedReviews.value[id] = !expandedReviews.value[id]
}

function shortText(text: string, limit = 320) {
  return text.length <= limit ? text : text.slice(0, limit) + "…"
}
</script>

<template>
  <!-- Error -->
  <div v-if="error" class="empty">{{ error }}</div>

  <!-- Loading -->
  <div v-else-if="isLoading" class="grid">
    <div class="skeleton hero"></div>
    <div class="skeleton title"></div>
    <div class="skeleton subtitle"></div>
    <div class="skeleton block"></div>
  </div>

  <!-- Content -->
  <div v-else-if="data" class="movie">
    <!-- Backdrop -->
    <div v-if="backdrop" class="backdrop">
      <img :src="backdrop" alt="" />
    </div>

    <!-- Main info -->
    <div class="content">
      <img
        v-if="poster"
        :src="poster"
        :alt="data.title"
        class="poster"
      />

      <div class="info">
        <h1 class="title">
          {{ data.title }}
          <span class="year">{{ year }}</span>
        </h1>

        <RatingStars :value="data.vote_average" />

        <div class="genres">
          <span
            v-for="g in data.genres || []"
            :key="g.id"
            class="badge"
          >
            {{ g.name }}
          </span>
        </div>

        <p class="overview">{{ data.overview }}</p>

        <div class="actions">
          <button
            class="btn primary"
            v-if="trailerKey"
            @click="showTrailer = true"
          >
            Watch Trailer
          </button>

          <button class="btn" @click="favoritesStore.toggle(data)">
            {{ favoritesStore.has(data.id) ? "★ Favorited" : "☆ Add Favorite" }}
          </button>
        </div>

        <div class="cast">
          <h3>Top Cast</h3>
          <div class="cast-list">
            <span
              v-for="c in (data.credits?.cast || []).slice(0, 10)"
              :key="c.id"
              class="badge"
            >
              {{ c.name }} — {{ c.character }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews -->
    <section
      v-if="data.reviews?.results?.length"
      class="reviews"
    >
      <div class="reviews-inner">
        <h3>User Reviews</h3>

        <article
          v-for="r in data.reviews.results.slice(0, 5)"
          :key="r.id"
          class="review-card"
        >
          <header class="review-header">
            <strong>{{ r.author }}</strong>
            <span class="review-date">
              {{ new Date(r.created_at).toLocaleDateString() }}
            </span>
          </header>

          <p class="review-text">
            {{ isExpanded(r.id) ? r.content : shortText(r.content) }}
          </p>

          <button
            v-if="r.content.length > 320"
            class="review-toggle"
            @click="toggleReview(r.id)"
          >
            {{ isExpanded(r.id) ? "Read less" : "Read more" }}
          </button>
        </article>
      </div>
    </section>
  </div>

  <!-- Trailer -->
  <TrailerModal
    v-if="showTrailer"
    :ytKey="trailerKey"
    @close="showTrailer = false"
  />
</template>

<style scoped>
/* Layout */
.movie {
  display: grid;
  gap: 28px;
}

.backdrop img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}

.content {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
}

.poster {
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
}

.info {
  display: grid;
  gap: 12px;
}

.title {
  margin: 0;
}

.year {
  margin-left: 6px;
  font-size: 0.8em;
  color: var(--muted);
}

.genres,
.cast-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.overview {
  color: var(--muted);
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* Reviews */
.reviews {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.reviews-inner {
  max-width: 900px;
  margin: 0 auto;
}

.review-card {
  margin-bottom: 18px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(255,255,255,0.08);
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.review-date {
  font-size: 12px;
  color: var(--muted);
}

.review-text {
  font-size: 14px;
  line-height: 1.65;
  white-space: pre-line;
}

.review-toggle {
  margin-top: 6px;
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: #64b5f6;
  cursor: pointer;
}

.review-toggle:hover {
  text-decoration: underline;
}

/* Skeletons */
.skeleton {
  border-radius: 16px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.06),
    rgba(255,255,255,0.12),
    rgba(255,255,255,0.06)
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}

.skeleton.hero { height: 320px; }
.skeleton.title { height: 24px; width: 60%; }
.skeleton.subtitle { height: 16px; width: 40%; }
.skeleton.block { height: 200px; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
