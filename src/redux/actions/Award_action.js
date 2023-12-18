import axios from "axios";
import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from "../constat";
import API from "./../urlnew";

export function createEvent(body) {
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
      .post(API + "/api/award/create", formData, config)
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

export function DeleteAward(id) {
  return (dispatch) => {
    axios.post(API + `/api/award/delete`, { id }).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_CATEGORY,
        payload: resp.data,
      });
    });
  };
}
export function UpdateAward(body) {
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

    axios.post(API + `/api/award/update`, formData, config).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: EDIT_CATEGORY,
        payload: resp.data,
      });
    });
  };
}
