// consts
const CHANGE = "reactauthentication/loading/change"

// store
const initialState = {
  loading: false,
}

// action
export const change = (isLoading = true) => ({
  type: CHANGE,
  payload: isLoading,
})

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE:
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export default reducer
