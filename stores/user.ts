import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'useUserStore',
  state: () => ({
    count: 0,
  }),
  actions: {},
  persist: true,
})
