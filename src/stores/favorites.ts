import { defineStore } from "pinia";

export type FavoriteMovie = {
  id: number;
  title: string;
  poster_path?: string | null;
  vote_average?: number;
  genre_ids?: number[];
};

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    map: {} as Record<number, FavoriteMovie>,
  }),
  getters: {
    list: (s) => Object.values(s.map),
    count: (s) => Object.keys(s.map).length,
    has: (s) => (id: number) => !!s.map[id],
  },
  actions: {
    toggle(movie: any) {
      const id = movie.id;
      if (this.map[id]) {
        delete this.map[id];
        return;
      }

      this.map[id] = {
        id,
        title: movie.title || movie.name || "",
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        genre_ids: movie.genre_ids,
      };
    },
    remove(id: number) {
      delete this.map[id];
    },
    clear() {
      this.map = {};
    },
  },
});