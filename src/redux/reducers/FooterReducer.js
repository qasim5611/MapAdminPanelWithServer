import { CREATE_FOOTER, DELETE_FOOTER, EDIT_FOOTER } from "../constat";
import history from "../../components/history/history";

let initState = {
  msg: null,
  isFooterDeleted: null,
  companyEditMsg: null,
};

export function footerReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_FOOTER:
      state.msg = "Company Succesfully Created.";
      setTimeout(() => {
        state.msg = null;
      });

      break;

    case DELETE_FOOTER:
      state.isFooterDeleted = action.payload;
      setTimeout(() => {
        state.isFooterDeleted = null;
      });

      break;

    case EDIT_FOOTER:
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
