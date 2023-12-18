import { CREATE_SIDEBAR, DELETE_SIDEBAR, EDIT_SIDEBAR } from "../constat";
import history from "../../components/history/history";

let initState = {
  msg: null,
  isSidebarDeleted: null,
  companyEditMsg: null,
};

export function sidebarReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_SIDEBAR:
      state.msg = "Company Succesfully Created.";
      setTimeout(() => {
        state.msg = null;
      });

      break;

    case DELETE_SIDEBAR:
      state.isSidebarDeleted = action.payload;
      setTimeout(() => {
        state.isSidebarDeleted = null;
      });

      break;

    case EDIT_SIDEBAR:
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
