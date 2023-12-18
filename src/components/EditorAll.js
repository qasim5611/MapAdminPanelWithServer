import React, { useEffect, useState } from "react";
import "./assets/css/animate.css";
import "./assets/css/style.css";

import { Row, Col } from "reactstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrashAlt,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteEDITOR as deleteEDITORAction } from "../redux/actions/EditorAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@material-ui/core/Switch";
import API from "./../redux/urlnew";

const Articles = () => {
  const [editorList, setEditorList] = useState(false);
  const [editorList2, setEditorList2] = useState(false);
  const [searchTxt, setSearchText] = useState(false);
  const dispatch = useDispatch();

  const isEditorDeleted = useSelector(
    (state) => state.editorReducer.isEditorDeleted
  );
  let admin_id = useSelector((state) => state.auth.userDetail);
  const searchTextField = (e) => {
    e.preventDefault();
    let searching = e.target.value.toLowerCase();
    let result = editorList2.filter(
      (item) => item.title && item.title.toLowerCase().includes(searching)
    );
    setEditorList(result);
  };
  useEffect(() => {
    axios.get(API + "/api/editor/get_all").then((result) => {
      setEditorList(result.data);
      setEditorList2(result.data);
    });
  }, [isEditorDeleted]);

  const submit = (_id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteEDITOR(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteEDITOR = (id) => {
    console.log(id);
    console.log(admin_id);
    dispatch(deleteEDITORAction({ editor_id: id, admin_id }));
  };
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <div class="content-wrapper">
        <div
          id="order_preview"
          class="wow fadeInUp content_box"
          style={{ visibility: "visible", animationName: "fadeInUp" }}
        >
          {/* Companies Header and Search Bar Start */}

          <Row className="table-header">
            <Col xs="12" md="2">
              <h2 class="section-title"> All Editors</h2>
            </Col>
            <Col xs="12" md="10">
              <form class="form-inline form-searchbar" action="#">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Start Typing to Search Story.."
                    onChange={searchTextField}
                  />
                </div>
                <Link to="/admin/add_editor">
                  <button class="btn btn-default">Add New</button>
                </Link>
              </form>
            </Col>
          </Row>

          {/* Companies Header and Search Bar End */}

          {/* Companies Table Sart */}

          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="table-responsive">
                {editorList ? (
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th class="active">S#</th>
                        <th class="active">Editor Name</th>
                        <th class="active">Editor Email</th>
                        <th class="active">Image</th>

                        <th class="active" style={{ width: "300px" }}>
                          Action
                        </th>
                        <th class="active">Status</th>
                      </tr>

                      {editorList.map((item, ind) => {
                        if (item.isEditor)
                          return (
                            <tr>
                              <td>{ind + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>

                              <td>
                                <img
                                  src={API + "/uploads/" + item.image}
                                  alt={item.image}
                                  height="50"
                                />
                              </td>
                              <td>
                                <FontAwesomeIcon
                                  icon={faUserEdit}
                                  className="iconCompany"
                                />

                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="iconCompany"
                                  onClick={() => submit(item._id)}
                                />
                              </td>
                              <td>
                                {" "}
                                <Switch
                                  checked={state.checkedB}
                                  onChange={handleChange}
                                  color="primary"
                                  name="checkedB"
                                  inputProps={{
                                    "aria-label": "primary checkbox",
                                  }}
                                />{" "}
                              </td>
                            </tr>
                          );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <CircularProgress
                    color="secondary"
                    style={{
                      marginLeft: "45%",
                      marginTop: 30,
                      marginBottom: 30,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Articles);
export let getCompanieslist;
