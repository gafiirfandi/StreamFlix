export const INITIAL_STATE = {
  currentOwnedMovies: [],
};

export const moviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_OWNED_MOVIES":
      return {
        ...state,
        currentOwnedMovies: action.payload,
      };

    default:
      return state;
  }
};
