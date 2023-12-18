import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from "../constat";
import history from "../../components/history/history";

let initState = {
  msg: null,
  isCategoryDeleted: null,
  companyEditMsg: null,
};

export function Talkshows_reducer(state = initState, action) {
  switch (action.type) {
    case CREATE_CATEGORY:
      state.msg = "Company Succesfully Created.";
      setTimeout(() => {
        state.msg = null;
      });


      break;

    case DELETE_CATEGORY:
      state.isCategoryDeleted = action.payload;
      setTimeout(() => {
        state.isCategoryDeleted = null;
      });

      break;

    case EDIT_CATEGORY:
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
