import { ActionTypes } from "../constants/action-types";

export const setPackageOne = (files: any) => {
  return {
    type: ActionTypes.SET_FIRST_PACKAGE,
    payload: files,
  };
};

export const setPackageTwo = (files: any) => {
  return {
    type: ActionTypes.SET_SECOND_PACKAGE,
    payload: files,
  };
};
