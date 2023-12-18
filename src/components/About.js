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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteStory as deleteStoryAction } from "../redux/actions/about_action";
import CircularProgress from "@material-ui/core/CircularProgress";
import API from "./../redux/urlnew";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Stories = () => {
  const [storyList, setStoryList] = useState(false);
  const [storyList2, setStoryList2] = useState(false);
  const [searchTxt, setSearchText] = useState(false);
  const dispatch = useDispatch();
  const isStoryDeleted = useSelector(
    (state) => state.topStoryReducer.isStoryDeleted
  );

  const searchTextField = (e) => {
    e.preventDefault();
    let searching = e.target.value.toLowerCase();
    let result = storyList2.filter(
      (item) =>
        item.storytitle && item.storytitle.toLowerCase().includes(searching)
    );
    setStoryList(result);
  };
  useEffect(() => {
    axios.get(API + "/api/gets_aboutcrud").then((result) => {
      setStoryList(result.data);
      setStoryList2(result.data);
    });
  }, [isStoryDeleted]);

  const submit = (_id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteStory(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const deleteStory = (id) => {
    dispatch(deleteStoryAction(id));
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
            <Col xs="12" md="4">
              <h2 class="section-title">Brand Impact About</h2>
            </Col>
            <Col xs="12" md="8">
              <form class="form-inline form-searchbar" action="#">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Start Typing to Search Story.."
                    onChange={searchTextField}
                  />
                </div>
                <Link to="/admin/create_new_about_text">
                  <button type="submit" class="btn btn-default">
                    Add New
                  </button>
                </Link>
              </form>
            </Col>
          </Row>

          {/* Companies Header and Search Bar End */}

          {/* Companies Table Sart */}

          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="table-responsive">
                {storyList ? (
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th class="active">S#</th>
                        {/* <th class="active">Story Title</th> */}
                        <th class="active">Story desc</th>
                        {/* <th class="active">Image</th>
                        <th class="active">Category</th>
                        <th class="active">Sub-Category</th>
                        <th class="active">Featured</th> */}
                        <th class="active" style={{ width: "300px" }}>
                          Action
                        </th>
                      </tr>
                      {storyList.map((item, ind) => {
                        return (
                          <tr>
                            <td>{ind + 1}</td>
                            {/* <td>{item.storytitle && item.storytitle}</td> */}
                            <td
                              dangerouslySetInnerHTML={{
                                __html: item.description && item.description,
                              }}
                            ></td>
                            {/* <td>
                              <img
                                src={API + "/api/uploads/" + item.image}
                                alt={item.image}
                                height="50"
                              />
                            </td>
                            <td>{item.category_name && item.category_name}</td>
                            <td>{item.sub_cate && item.sub_cate}</td>
                            <td>{item.isFeatured ? "Yes" :"No"}</td> */}
                            <td>
                              {/* <FontAwesomeIcon
                                icon={faEye}
                                className="iconCompany"
                              /> */}

                              <Link
                                to={`/admin/about_update/${item._id}`}
                                id={item._id}
                              >
                                <FontAwesomeIcon
                                  icon={faUserEdit}
                                  className="iconCompany"
                                />
                              </Link>

                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="iconCompany"
                                onClick={() => submit(item._id)}
                              />
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

export default withRouter(Stories);
export let getCompanieslist;
