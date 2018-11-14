export const addItem = (state, item) => {
  state.tikets.push(item)
}
export const removeItem = (state, itemIndex) => {
  state.tikets.splice(itemIndex, 1)
}
