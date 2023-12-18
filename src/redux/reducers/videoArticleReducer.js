import {
  CREATE_VIDEO_ARTICLE,

  DELETE_VIDEO_ARTICLE,
  EDIT_VIDEO_ARTICLE,
  UPDATE_VIDEO_SECCUSS
} from "../constat";
import history from "../../components/history/history";

let initState = {
  msg: null,
  companies: [],
  isStoryDeleted: null,
  companyEditMsg: null,
  isVideoUpdatae: null
};

export function videoArticleReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_VIDEO_ARTICLE:
      state.msg = "Company Succesfully Created.";

      break;


    case DELETE_VIDEO_ARTICLE:
      state.isStoryDeleted = action.payload;
      setTimeout(() => {
        state.isStoryDeleted = null;
      });

      break;
      case UPDATE_VIDEO_SECCUSS:
        state.isVideoUpdatae = action.payload;
        setTimeout(() => {
          state.isVideoUpdatae = null;
        });
  
        break;
    case EDIT_VIDEO_ARTICLE:
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
