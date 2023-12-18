import { CREATE_HEADER, DELETE_HEADER, EDIT_HEADER } from "../constat";
import history from "../../components/history/history";

let initState = {
  msg: null,
  isHeaderDeleted: null,
  companyEditMsg: null,
};

export function headerReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_HEADER:
      state.msg = "Company Succesfully Created.";
      setTimeout(() => {
        state.msg = null;
      });
      break;

    case DELETE_HEADER:
      state.isHeaderDeleted = action.payload;
      setTimeout(() => {
        state.isHeaderDeleted = null;
      });

      break;

    case EDIT_HEADER:
      state.companyEditMsg = "Company Successfully Edited";
      setTimeout(() => {
        history.push("/");
      });

      break;

    default:
      break;
  }
  return state;
}
