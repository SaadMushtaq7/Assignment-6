import { ActionTypes } from "../constants/action-types";
const initialState = {
  firstPackage: {},
  secondPackage: {},
};

export const packageReducer = (
  state = initialState,
  { type, payload }: { type: any; payload: any }
) => {
  switch (type) {
    case ActionTypes.SET_FIRST_PACKAGE:
      return { ...state, firstPackage: payload };
    case ActionTypes.SET_SECOND_PACKAGE:
      return { ...state, secondPackage: payload };
    default:
      return state;
  }
};
