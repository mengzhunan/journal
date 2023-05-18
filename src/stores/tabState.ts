import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTabState = defineStore('tabState', () => {

  const tabState = ref(true)
  const skeletonState = ref(true)

  function alterTabState(state: boolean) {
    tabState.value = state
  }

  function alterSkeletonState(state: boolean) {
    skeletonState.value = state
  }

  return { tabState, skeletonState, alterTabState, alterSkeletonState }
})
