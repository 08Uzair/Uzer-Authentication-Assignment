import { LOGOUT, AUTH } from "../constants/actionTypes";

const authReducer = (state = { authData: {} }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };
    case LOGOUT:
      return { ...state, authData: {}, loading: false, errors: null };
    default:
      return state;
  }
};
export default authReducer;
