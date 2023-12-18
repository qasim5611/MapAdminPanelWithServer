import axios from "axios";
import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from "../constat";
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
      .post(API + "/api/talkshow/add", formData, config)
      .then((resp) => {
        // successFul("success");
        dispatch({
          type: CREATE_CATEGORY,
          payload: resp.data,
        });
      })
      .catch((err) => {
        // createdFail("err");
        console.log(err);
      });
  };
}
export function createSubCategory(body) {
  return (dispatch) => {
    axios
      .post(API + "/api/SubCategories/add", body)
      .then((resp) => {
        dispatch({
          type: CREATE_CATEGORY,
          payload: resp.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteTalkShow(id) {
  return (dispatch) => {
    axios.post(API + `/api/talkshow/delete`, { id }).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_CATEGORY,
        payload: resp.data,
      });
    });
  };
}
export function updateTalkshow(body) {
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

    axios.post(API + `/api/talkshow/update`, formData, config).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_CATEGORY,
        payload: resp.data,
      });
    });
  };
}
