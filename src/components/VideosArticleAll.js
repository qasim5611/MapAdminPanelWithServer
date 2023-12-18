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
import { deleteVideo as deleteVideoAction } from "../redux/actions/videoArticleAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import API from "./../redux/urlnew";
import videoUpdate from "./videoUpdate";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import ReactPlayer from "react-player";

const AllVideoArticle = () => {
  const [articleList, setArticleList] = useState(false);
  const [articleList2, setArticleList2] = useState(false);
  const [searchTxt, setSearchText] = useState(false);
  const dispatch = useDispatch();
  const isArticleDeleted = useSelector(
    (state) => state.videoArticleReducer.isStoryDeleted
  );

  const searchTextField = (e) => {
    e.preventDefault();
    let searching = e.target.value;
    let result = articleList2.filter(
      (item) =>
        item.title && item.title.toLowerCase().includes(searching.toLowerCase())
    );
    setArticleList(result);
  };
  useEffect(() => {
    axios.get(API + "/api/gets_video").then((result) => {
      setArticleList(result.data);
      setArticleList2(result.data);
    });
  }, [isArticleDeleted]);
  const submit = (_id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteArticle(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const deleteArticle = (id) => {
    dispatch(deleteVideoAction(id));
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
              <h2 class="section-title">Video Articles</h2>
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
                <Link to="/admin/add_video">
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
                {articleList ? (
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th class="active">S#</th>
                        <th class="active">Video Link</th>
                        <th class="active">video</th>
                        {/* <th class="active">Video</th>
                        <th class="active">Featured</th> */}
                        <th class="active" style={{ width: "300px" }}>
                          Action
                        </th>
                      </tr>

                      {articleList.map((item, ind) => {
                        console.log(item);
                        return (
                          <tr>
                            <td>{ind + 1}</td>
                            <td>{item.videolink && item.videolink}</td>
                            {/* <td
                              dangerouslySetInnerHTML={{
                                __html: item.description && item.description,
                              }}
                            ></td> */}
                            <td>
                              {/* <iframe
                                width="100%"
                                height="250"
                                src={item.videolink && item.videolink}
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                              ></iframe> */}

                              <ReactPlayer
                                width="300px"
                                height="300px"
                                url={item.videolink && item.videolink}
                              />

                              {/* <img
                                src={API + "/api/uploads/" + item.image}
                                alt={item.image}
                                height="50"
                              /> */}
                            </td>
                            {/* <td>{item.isFeatured ? "Yes" : "No"}</td> */}
                            <td>
                              {/* <FontAwesomeIcon
                                icon={faEye}
                                className="iconCompany"
                              /> */}
                              <Link
                                to={`/admin/video_update/${item._id}`}
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

export default withRouter(AllVideoArticle);
export let getCompanieslist;
