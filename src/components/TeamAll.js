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
import { deleteArticle as deleteArticleAction } from "../redux/actions/teamAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import API from "./../redux/urlnew";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Our_Team = () => {
  const [articleList, setArticleList] = useState(false);
  const [articleList2, setArticleList2] = useState(false);
  const [searchTxt, setSearchText] = useState(false);
  const dispatch = useDispatch();
  const isArticleDeleted = useSelector(
    (state) => state.ArticleReducer.isArticleDeleted
  );
  const searchTextField = (e) => {
    e.preventDefault();
    let searching = e.target.value.toLowerCase();
    let result = articleList2.filter(
      (item) => item.title && item.title.toLowerCase().includes(searching)
    );
    setArticleList(result);
  };
  useEffect(() => {
    axios.get(API + "/api/gets_article").then((result) => {
      console.log(result.data);
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
    dispatch(deleteArticleAction(id));
  };

  const updateArticle = (id) => {
    dispatch(deleteArticleAction(id));
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
              <h2 class="section-title"> Our Teams</h2>
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
                <Link to="/admin/create_new_team">
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
                        <th class="active">Member Name</th>
                        <th class="active">Member Position</th>

                        <th class="active">Member desc</th>
                        <th class="active">Image</th>
                        <th class="active">View In LandingPage</th>
                        <th class="active" style={{ width: "300px" }}>
                          Action
                        </th>
                      </tr>

                      {articleList.map((item, ind) => {
                        return (
                          <tr>
                            <td>{ind + 1}</td>
                            <td>{item.title && item.title}</td>
                            <td>{item.position && item.position}</td>

                            <td
                              dangerouslySetInnerHTML={{
                                __html: item.description && item.description,
                              }}
                            ></td>
                            <td>
                              <img
                                src={API + "/api/uploads/" + item.image}
                                alt={item.image}
                                height="50"
                              />
                            </td>
                            <td>
                              {item.checkbox.toString() === "true" ? (
                                <div
                                  style={{
                                    backgroundColor: "#008000c2",
                                    color: "white",
                                    padding: "7px",
                                    alignItems: "center",
                                    width: "60%",
                                    margin: "0px auto",
                                    /* font-weight: 500; */
                                    fontSize: "13px",
                                    borderTopRightRadius: "14px",
                                    borderBottomLeftRadius: "14px",
                                  }}
                                >
                                  <center>Visible</center>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    borderBottomRightRadius: "14px",
                                    borderTopLeftRadius: "14px",
                                    backgroundColor: "#0080003d",
                                    color: "black",
                                    padding: "7px",
                                    alignItems: "center",
                                    width: "60%",
                                    margin: "0px auto",
                                    /* font-weight: 500; */
                                    fontSize: "13px",
                                  }}
                                >
                                  <center>Disabled</center>
                                </div>
                              )}
                            </td>
                            {/* <td>{item.category_name && item.category_name}</td>
                            <td>{item.sub_cate && item.sub_cate}</td>
                            <td>{item.isFeatured ? "Yes" : "No"}</td> */}
                            <td>
                              <Link
                                to={`/admin/update_team/${item._id}`}
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

export default withRouter(Our_Team);
export let getCompanieslist;
