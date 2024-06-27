// export const useViewStore = defineStore('viewStore', () => {
//   const viewMode = ref('')

//   return { viewMode }
// })
  
export const useViewStore = defineStore('viewStore', () => {
  const viewMode = ref(localStorage.getItem('viewMode') || 'Kartu')

  const setViewMode = (mode) => {
    localStorage.setItem('viewMode', mode)
    viewMode.value = mode
  }

  return { viewMode, setViewMode }
})
