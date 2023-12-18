import axios from "axios";
import {
  CREATE_TOP_STORY,
  COMPANIES_LIST,
  DELETE_TOP_STORY,
  EDIT_TOP_STORY,
  UPDATE_STORY_SECCUSS,
} from "../constat";
import { getCompanieslist } from "../../components/About";
// import {Propstype} from 'Prop'
import { successFul, createdFail } from "../../components/galleryAddNew";
import { successFulEdit, editFail } from "../../components/editCompany";
import API from "./../urlnew";

export function createStory(body) {
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
      .post(API + "/api/create_story", body)
      .then((resp) => {
        dispatch({
          type: CREATE_TOP_STORY,
          payload: resp.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteStory(id) {
  return (dispatch) => {
    axios.post(API + `/api/delete_story`, { id }).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_TOP_STORY,
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
          type: EDIT_TOP_STORY,
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

export function updateStory(body) {
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
    axios.post(API + `/api/update_aboutcrud`, body).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: UPDATE_STORY_SECCUSS,
        payload: resp.data,
      });
    });
  };
}
