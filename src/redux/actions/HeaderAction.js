import axios from "axios";
import {
  CREATE_HEADER,
  COMPANIES_LIST,
  DELETE_HEADER,
  EDIT_HEADER,
} from "../constat";
import API from "./../urlnew";

export function createHeaderItem(body) {
  return (dispatch) => {
    axios
      .post(API + "/api/header/add", body)
      .then((resp) => {
        // successFul("success");
        dispatch({
          type: CREATE_HEADER,
          payload: resp.data,
        });
      })
      .catch((err) => {
        // createdFail("err");
        console.log(err);
      });
  };
}

export function deleteHeaderAction(id) {
  return (dispatch) => {
    axios.post(API + `/api/header/delete`, id).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_HEADER,
        payload: resp.data,
      });
    });
  };
}

export function updateHeader(body) {
  return (dispatch) => {
    axios
      .post(API + "/api/header/update", body)
      .then((resp) => {
        // successFul("success");
        dispatch({
          type: CREATE_HEADER,
          payload: resp.data,
        });
      })
      .catch((err) => {
        // createdFail("err");
        console.log(err);
      });
  };
}
