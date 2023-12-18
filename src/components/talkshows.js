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
import { faTimes, faUserEdit } from "@fortawesome/free-solid-svg-icons";

import { withRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  deleteTalkShow,
  deleteSubCategory,
} from "../redux/actions/Talkshow_action";
import CircularProgress from "@material-ui/core/CircularProgress";
import API from "./../redux/urlnew";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Category = () => {
  const [categories, setCategories] = useState(false);
  const [categories2, setCategories2] = useState(false);
  const [searchTxt, setSearchText] = useState(false);
  const dispatch = useDispatch();
  const isCategoryDeleted = useSelector(
    (state) => state.categoryReducer.isCategoryDeleted
  );

  const searchTextField = (e) => {
    e.preventDefault();
    let result = categories2.filter(
      (item) =>
        item.category_name &&
        item.category_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCategories(result);
  };

  useEffect(() => {
    axios.get(API + "/api/talkshow/get").then((result) => {
      console.log(result.data);
      setCategories(result.data);
      setCategories2(result.data);
    });
  }, [isCategoryDeleted]);

  // useEffect(() => {
  //   axios.get(API + "/api/gallery/gets").then((result) => {
  //     console.log(result.data)
  //     setCategories(result.data);
  //     setCategories2(result.data);
  //   });
  // }, []);

  const submit = (_id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCategory(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const deleteCategory = (id) => {
    dispatch(deleteTalkShow(id));
  };
  // const removeSubCate = (id) => {
  //   dispatch(deleteSubCategory(id));
  // };

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
              <h2 class="section-title">All Talkshows</h2>
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
                <Link to="/admin/talkshowcreate">
                  <button type="submit" class="btn btn-default">
                    Add New
                  </button>
                </Link>
                {/* <Link to="/admin/CategoriesAddSubCate" className="ml-5">
                  <button type="submit" class="btn btn-default">
                    Add New Sub Category
                  </button>
                </Link> */}
              </form>
            </Col>
          </Row>

          {/* Companies Table Sart */}

          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="table-responsive">
                {categories ? (
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th class="active">S#</th>
                        <th class="active">Title</th>
                        <th class="active">Short Description</th>
                        <th class="active">Details Description</th>

                        {/* <th class="active">Story desc</th> */}
                        <th class="active">Award Logo Image</th>
                        {/* <th class="active">Sub-Category</th> */}

                        <th class="active" style={{ width: "300px" }}>
                          Action
                        </th>
                      </tr>
                      {categories.map((item, ind) => {
                        return (
                          <tr>
                            <td>{ind + 1}</td>
                            <td>{item.title && item.title}</td>
                            <td>{item.subtitle && item.subtitle}</td>

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
                            {/* <td width="200px">
                              {item.sub_cate.length > 0
                                ? item.sub_cate.map((sub, key) => (
                                    <span className="tags_list" key={key}>
                                      {sub.sub_category_name}
                                      <FontAwesomeIcon
                                        icon={faTimes}
                                        className="icon_corss"
                                        title="remove"
                                        onClick={() => removeSubCate(sub._id)}
                                      />
                                    </span>
                                  ))
                                : "No Sub-Category Added"}
                            </td> */}

                            <td>
                              <Link to={`/admin/talkshow_update/${item._id}`}>
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

export default withRouter(Category);
export let getCompanieslist;
