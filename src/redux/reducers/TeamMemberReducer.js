import {
    CREATE_ARTICLE,
    DELETE_ARTICLE,
    EDIT_ARTICLE,
    UPDATE_ATICLE_SECCUSS,
    TEAM_UPDATE
  } from "../constat";
  import history from "../../components/history/history";
  
  let initState = {
    msg: null,
    success: null,
    isArticleDeleted: null,
    companyEditMsg: null,
    isArticleUpdated: null,
  };
  
  export function TeamMember(state = initState, action) {
    switch (action.type) {
      case CREATE_ARTICLE:
        state.msg = "Company Succesfully Created.";
        setTimeout(() => {
          state.msg = null;
        });
        break;
  
      case DELETE_ARTICLE:
        state.isArticleDeleted = action.payload;
        setTimeout(() => {
          state.isArticleDeleted = null;
        });
  
        break;
  
      case TEAM_UPDATE:
        state.isArticleUpdated = action.payload;
        setTimeout(() => {
          state.isArticleUpdated = null;
        }, 200);
        break;
        
      case EDIT_ARTICLE:
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
  