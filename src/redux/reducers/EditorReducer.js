import { CREATE_EDITOR, DELETE_EDITOR, EDIT_EDITOR } from "../constat";
import history from "../../components/history/history";

let initState = {
  msg: null,
  isEditorDeleted: null,
  companyEditMsg: null,
};

export function editorReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_EDITOR:
      state.msg = "Editor Succesfully Created.";

      break;

    case DELETE_EDITOR:
      state.isEditorDeleted = action.payload;
      setTimeout(() => {
        state.isEditorDeleted = null;
      });

      break;

    case EDIT_EDITOR:
      state.companyEditMsg = "Company Successfully Edited";

      break;

    default:
      break;
  }
  return state;
}
