import { CREATE_BANNER, DELETE_BANNER, EDIT_BANNER  , UPDATE_BANNER_SECCUSS} from "../constat";
import history from "../../components/history/history";

let initState = {
  msg: null,
  isBannerDeleted: null,
  companyEditMsg: null,
  isBannerUpdatae: null ,
};

export function bannerReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_BANNER:
      state.msg = "Company Succesfully Created.";
      setTimeout(() => {
        state.msg = null;
      });
      break;

    case DELETE_BANNER:
      state.isBannerDeleted = action.payload;
      setTimeout(() => {
        state.isBannerDeleted = null;
      });

      break;

      case UPDATE_BANNER_SECCUSS:
      state.isBannerUpdatae = action.payload;
      setTimeout(() => {
        state.isBannerUpdatae = null;
      });

      break;

    case EDIT_BANNER:
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
