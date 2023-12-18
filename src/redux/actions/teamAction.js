import axios from "axios";
import {
  CREATE_ARTICLE,
  COMPANIES_LIST,
  DELETE_ARTICLE,
  EDIT_ARTICLE,
  UPDATE_ATICLE_SECCUSS,
  TEAM_UPDATE,
} from "../constat";

import API from "./../../redux/urlnew";

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
      .post(API + "/api/create_article", formData, config)
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

export function updateTeam(body) {
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
    axios.post(API + `/api/update_team`, formData, config).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: TEAM_UPDATE,
        payload: resp.data,
      });
    });
  };
}
