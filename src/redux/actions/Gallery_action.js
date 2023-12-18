import axios from "axios";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GALLERY_UPDATE,
} from "../constat";
import API from "./../urlnew";

export function createCategory(body) {
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
      .post(API + "/api/gallery/create", formData, config)
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

export function deleteCategory(id) {
  return (dispatch) => {
    axios.post(API + `/api/gallery/delete`, { id }).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_CATEGORY,
        payload: resp.data,
      });
    });
  };
}
export function deleteSubCategory(id) {
  return (dispatch) => {
    axios
      .post(API + `/api/SubCategories/delete`, { sub_category_id: id })
      .then((resp) => {
        console.log(resp.data);
        dispatch({
          type: DELETE_CATEGORY,
          payload: resp.data,
        });
      });
  };
}

export function GalleryUpdate(body) {
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
    axios.post(API + `/api/gallery/update`, formData, config).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: GALLERY_UPDATE,
        payload: resp.data,
      });
    });
  };
}
