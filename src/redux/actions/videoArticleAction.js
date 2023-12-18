import axios from "axios";
import {
  CREATE_VIDEO_ARTICLE,
  COMPANIES_LIST,
  DELETE_VIDEO_ARTICLE,
  EDIT_VIDEO_ARTICLE,
  UPDATE_VIDEO_SECCUSS,
} from "../constat";
import { getCompanieslist } from "../../components/About";
// import {Propstype} from 'Prop'
import { successFul, createdFail } from "../../components/galleryAddNew";
import { successFulEdit, editFail } from "../../components/editCompany";
import API from "./../../redux/urlnew";

export function createVdoArticle(body) {
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
      .post(API + "/api/create_video", body)
      .then((resp) => {
        dispatch({
          type: CREATE_VIDEO_ARTICLE,
          payload: resp.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteVideo(id) {
  return (dispatch) => {
    axios.post(API + `/api/delete_video`, { id }).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_VIDEO_ARTICLE,
        payload: resp.data,
      });
    });
  };
}

export function editCompany(id, body) {
  return (dispatch) => {
    let token = localStorage.getItem("token");

    let header = {
      headers: {
        "Content-Type": "application/json",

        "x-sh-auth": token,
      },
    };
    let {
      company_name,
      employee_limit,
      work_email,
      ph_no,
      services,
      expense_image,
      expense_group,
      payment_type,
      email_template,
      image_file,
    } = body;
    let newCompany = {
      company_name,
      employee_limit,
      work_email,
      ph_no,
      services,
      expense_group,
      expense_image,
      payment_type,
      email_template,
      image_file,
    };
    axios
      .post(
        `https://mr-expense-backend.herokuapp.com/admin/edit_company?_id=${id}`,
        newCompany,
        header
      )
      .then((resp) => {
        getCompanieslist();
        successFulEdit("success");
        dispatch({
          type: EDIT_VIDEO_ARTICLE,
          payload: resp.data,
        });
      })
      .catch((err) => {
        editFail("err");
        console.log(err);
      });
  };
}

// export function approveExpenseByCompany(id) {

//     return dispatch => {

//         let token = localStorage.getItem('token')

//         let header = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-sh-auth': token
//             }
//         }

//         axios.get(`https://mr-expense-backend.herokuapp.com/admin/delete_company?_id=${id}`, header)
//             .then(resp => {
//                 getCompanieslist()
//                 dispatch({
//                     type: DELETE_COMPANY,
//                     payload: resp.data
//                 })
//             })
//     }
// }

export function updateVideo(body) {
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
    axios.post(API + `/api/update_video`, body).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: UPDATE_VIDEO_SECCUSS,
        payload: resp.data,
      });
    });
  };
}
