import axios from "axios";
import { CREATE_FOOTER, DELETE_FOOTER, EDIT_FOOTER } from "../constat";
import API from "./../../redux/urlnew";

export function createFooter(body) {
  return (dispatch) => {
    axios
      .post(API + "/api/footer/add", body)
      .then((resp) => {
        // successFul("success");
        dispatch({
          type: CREATE_FOOTER,
          payload: resp.data,
        });
      })
      .catch((err) => {
        // createdFail("err");
        console.log(err);
      });
  };
}

export function deleteFooter(id) {
  return (dispatch) => {
    axios.post(API + `/api/footer/delete`, id).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_FOOTER,
        payload: resp.data,
      });
    });
  };
}

export function UpdateFooter(body) {
  return (dispatch) => {
    axios
      .post(API + "/api/footer/update", body)
      .then((resp) => {
        // successFul("success");
        dispatch({
          type: CREATE_FOOTER,
          payload: resp.data,
        });
      })
      .catch((err) => {
        // createdFail("err");
        console.log(err);
      });
  };
}
