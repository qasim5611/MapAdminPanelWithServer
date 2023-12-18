import axios from "axios";
import {
  CREATE_MAGZINE,
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
    console.log("formData", formData);
    axios
      .post(API + "/api/magzine/addBlog", formData, config)
      .then((resp) => {
        // successFul("success");
        console.log("resp.data", resp.data);

        dispatch({
          type: CREATE_MAGZINE,
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
    axios.post(API + `/api/magzine/delete`, { id }).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_ARTICLE,
        payload: resp.data,
      });
    });
  };
}

export function updateMagzine(body) {
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
    axios.post(API + `/api/magzine/update`, formData, config).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: UPDATE_ATICLE_SECCUSS,
        payload: resp.data,
      });
    });
  };
}
