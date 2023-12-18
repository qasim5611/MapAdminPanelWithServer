import axios from "axios";
import {
  CREATE_BANNER,
  COMPANIES_LIST,
  DELETE_BANNER,
  EDIT_BANNER,
  UPDATE_BANNER_SECCUSS,
} from "../constat";
import API from "./../urlnew";

export function createBanner(body) {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    let formData = new FormData();

    for (var item in body) {
      formData.append(item, body[item]);
    }

    // function getFormData(formData, data, previousKey) {
    //   if (data instanceof Object) {
    //     Object.keys(data).forEach((key) => {
    //       const value = data[key];
    //       if (value instanceof Object && !Array.isArray(value)) {
    //         return getFormData(formData, value, key);
    //       }
    //       if (previousKey) {
    //         key = `${previousKey}[${key}]`;
    //       }
    //       if (Array.isArray(value)) {
    //         value.forEach((val, key) => {
    //           formData.append(`${key}[]`, val);
    //           if (key !== "images") {
    //             if (val instanceof Object && !Array.isArray(val)) {
    //               return getFormData(formData, val, key);
    //             }
    //           }
    //         });
    //       } else {
    //         formData.append(key, value);
    //       }
    //     });
    //   }
    // }
    // getFormData(formData, body);
    axios
      .post(API + "/api/banner/add", formData, config)
      .then((resp) => {
        // successFul("success");
        dispatch({
          type: CREATE_BANNER,
          payload: resp.data,
        });
      })
      .catch((err) => {
        // createdFail("err");
        console.log(err);
      });
  };
}

export function deleteBanner(id) {
  return (dispatch) => {
    axios.post(API + `/api/banner/delete`, { id }).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_BANNER,
        payload: resp.data,
      });
    });
  };
}

export function bannerupdate(body) {
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
    axios.post(API + `/api/banner/update`, formData, config).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: UPDATE_BANNER_SECCUSS,
        payload: resp.data,
      });
    });
  };
}
