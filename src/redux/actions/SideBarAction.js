import axios from "axios";
import { CREATE_SIDEBAR, DELETE_SIDEBAR, EDIT_SIDEBAR } from "../constat";
import API from "./../urlnew";

export function createSidebar(body) {
  return (dispatch) => {
    axios
      .post(API + "/api/sidebar/add", body)
      .then((resp) => {
        // successFul("success");
        dispatch({
          type: CREATE_SIDEBAR,
          payload: resp.data,
        });
      })
      .catch((err) => {
        // createdFail("err");
        console.log(err);
      });
  };
}

export function deleteSidebar(id) {
  return (dispatch) => {
    axios.post(API + `/api/sidebar/delete`, id).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_SIDEBAR,
        payload: resp.data,
      });
    });
  };
}

export function UpdateSidebar(body) {
  return (dispatch) => {
    axios
      .post(API + "/api/sidebar/update", body)
      .then((resp) => {
        // successFul("success");
        dispatch({
          type: CREATE_SIDEBAR,
          payload: resp.data,
        });
      })
      .catch((err) => {
        // createdFail("err");
        console.log(err);
      });
  };
}
