export const INITIAL_STATE = {
  currentMoney: 100000,
};

export const moneyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_MONEY":
      return {
        ...state,
        currentMoney: action.payload,
      };

    default:
      return state;
  }
};
