import axios from "axios";
import { CREATE_EDITOR, DELETE_EDITOR, EDIT_EDITOR } from "../constat";
import API from "./../urlnew";

export function createEditor(body) {
  return (dispatch) => {
    // let token = localStorage.getItem('token')
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let formData = new FormData();

    for (var item in body) {
      formData.append(item, body[item]);
    }
    axios
      .post(API + "/api/editor/add", formData, config)
      .then((resp) => {
        dispatch({
          type: CREATE_EDITOR,
          payload: resp.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteEDITOR(body) {
  return (dispatch) => {
    axios.post(API + `/api/editor/delete`, body).then((resp) => {
      console.log(resp.data);
      dispatch({
        type: DELETE_EDITOR,
        payload: resp.data,
      });
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
//                 dispatch({
//                     type: DELETE_COMPANY,
//                     payload: resp.data
//                 })
//             })
//     }
// }
