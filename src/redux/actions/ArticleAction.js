import axios from "axios";
import {
  CREATE_ARTICLE,
  COMPANIES_LIST,
  DELETE_ARTICLE,
  EDIT_ARTICLE,
  UPDATE_ATICLE_SECCUSS,
} from "../constat";
import API from "./../urlnew";

export function createArticle(body) {
  return (dispatch) => {
    let token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let formData = new FormData();

    for (var item in body) {
      formData.append(item, body[item]);
    }
    console.log(formData);
    axios
      .post(API + "/api/talkshow/add", formData, config)
      .then((resp) => {
        // successFul("success");
        dispatch({
          type: CREATE_ARTICLE,
          payload: resp.data,
        });
      })
      .catch((err) => {
        // createdFail("err");
        console.log(err);
      });
  };
}

export function deleteArticle(id) {
  return (dispatch) => {
    axios.post(API + `/api/delete_article`, { id }).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_ARTICLE,
        payload: resp.data,
      });
    });
  };
}

export function updateArticle(body) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  let formData = new FormData();

  for (var item in body) {
    formData.append(item, body[item]);
  }
  return (dispatch) => {
    axios.post(API + `/api/update_article`, formData, config).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: UPDATE_ATICLE_SECCUSS,
        payload: resp.data,
      });
    });
  };
}
