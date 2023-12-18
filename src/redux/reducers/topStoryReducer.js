import {
  CREATE_TOP_STORY,

  DELETE_TOP_STORY,
  EDIT_TOP_STORY,
  UPDATE_STORY_SECCUSS
} from "../constat";
import history from "../../components/history/history";

let initState = {
  msg: null,
  companies: [],
  isStoryDeleted: null,
  companyEditMsg: null,
  isStoryUpdate: null 
};

export function topStoryReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_TOP_STORY:
      state.msg = "Company Succesfully Created.";

      break;


    case DELETE_TOP_STORY:
      state.isStoryDeleted = action.payload;
      setTimeout(() => {
        state.isStoryDeleted = null;
      });

      break;
    
      case UPDATE_STORY_SECCUSS:
        state.isStoryUpdate = action.payload;
        setTimeout(() => {
          state.isStoryUpdate = null;
        }, [200]);
  
        break;

    case EDIT_TOP_STORY:
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
