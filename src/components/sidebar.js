import React, { useEffect, useState } from "react";
import "./assets/css/animate.css";
import "./assets/css/style.css";

import { Row, Col } from "reactstrap";

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
import {
  deleteFooter as deleteFooterAction,
  UpdateFooter,
} from "../redux/actions/FooterAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@material-ui/core/Switch";
import API from "./../redux/urlnew";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const SideBar = () => {
  const [editorList, setEditorList] = useState(false);
  const [editorList2, setEditorList2] = useState(false);
  const [searchTxt, setSearchText] = useState(false);
  const dispatch = useDispatch();
  const isFooterDeleted = useSelector(
    (state) => state.footerReducer.isFooterDeleted
  );
  let admin_id = useSelector((state) => state.auth.userDetail);
  const searchTextField = (e) => {
    e.preventDefault();
    let result = editorList2.filter(
      (item) => item.title && item.title.includes(e.target.value)
    );
    setEditorList(result);
  };
  useEffect(() => {
    axios.get(API + "/api/footer/get_all").then((result) => {
      setEditorList(result.data);
      setEditorList2(result.data);
    });
  }, [isFooterDeleted]);

  const deleteFooter = (id) => {
    dispatch(deleteFooterAction({ _id: id, admin_id }));
  };
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const submit = (_id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteFooter(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const changeStatus = (e, id) => {
    e.preventDefault();
    let obj = {
      status: e.target.checked ? 1 : 2,
      _id: id,
    };
    dispatch(UpdateFooter(obj));
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
              <h2 class="section-title">Footer Section</h2>
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
                <Link to="/admin/footer_new">
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
                        <th class="active" style={{ width: 50 }}>
                          S#
                        </th>
                        <th class="active" style={{ width: 200 }}>
                          Position
                        </th>
                        <th class="active">Desc</th>
                        <th class="active" style={{ width: "300px" }}>
                          Action
                        </th>
                        <th class="active">Status</th>
                      </tr>
                      {editorList.map((item, ind) => {
                        return (
                          <tr>
                            <td>{ind + 1}</td>
                            <td>
                              {item.footer_position === 1
                                ? "First"
                                : item.footer_position === 2
                                ? "Second"
                                : item.footer_position === 3
                                ? "Third"
                                : "Forth"}
                            </td>
                            <td
                              dangerouslySetInnerHTML={{
                                __html: item.description && item.description,
                              }}
                            ></td>

                            <td>
                              <Link to={`/admin/footer_edit/${item._id}`}>
                                <FontAwesomeIcon
                                  icon={faUserEdit}
                                  className="iconCompany"
                                />
                              </Link>

                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="iconCompany"
                                onClick={() => {
                                  submit(item._id);
                                }}
                              />
                            </td>
                            <td>
                              {" "}
                              <Switch
                                checked={item.status == 1 ? true : false}
                                onChange={(e) => changeStatus(e, item._id)}
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

export default withRouter(SideBar);
export let getCompanieslist;
