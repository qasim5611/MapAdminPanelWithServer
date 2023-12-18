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
import { deleteBanner as deleteBannerAction } from "../redux/actions/bannerAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import API from "./../redux/urlnew";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Articles = () => {
  const [bannerList, setBannerList] = useState(false);
  const [articleList, setArticleList] = useState(false);
  const [bannerList2, setBannerList2] = useState(false);
  const [searchTxt, setSearchText] = useState(false);
  const dispatch = useDispatch();
  const isBannerDeleted = useSelector(
    (state) => state.bannerReducer.isBannerDeleted
  );
  const searchTextField = (e) => {
    e.preventDefault();
    let searching = e.target.value.toLowerCase();
    let result = bannerList2.filter(
      (item) => item.title && item.title.toLowerCase().includes(searching)
    );
    setBannerList(result);
  };
  useEffect(() => {
    axios.get(API + "/api/banner/get_all").then((result) => {
      console.log(result.data);
      setBannerList(result.data);
      setBannerList2(result.data);
    });
  }, [isBannerDeleted]);

  const submit = (_id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteBanner(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const deleteBanner = (id) => {
    dispatch(deleteBannerAction(id));
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
              <h2 class="section-title">All Articles</h2>
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
                <Link to="/admin/banner_add_new">
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
                {bannerList ? (
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th class="active">S#</th>
                        <th class="active">Title</th>
                        <th class="active">Sub-Title</th>
                        <th class="active">Article Title</th>
                        <th class="active">Images</th>
                        <th class="active">Action</th>
                      </tr>

                      {bannerList.map((item, ind) => {
                        return (
                          <tr>
                            <td>{ind + 1}</td>
                            <td>{item.title && item.title}</td>
                            <td>{item.sub_title && item.sub_title}</td>
                            <td>{item.article_name}</td>
                            {/* <td
                              width="300"
                              dangerouslySetInnerHTML={{
                                __html: item.description && item.description,
                              }}
                            ></td> */}
                            <td style={{ display: "flex", flexWrap: "wrap" }}>
                              <img
                                src={API + "/api/uploads/" + item.image}
                                alt={item.image}
                                height="30"
                                width="40"
                                style={{ marginTop: 3, marginLeft: 3 }}
                              />
                            </td>
                            {/* <td>
                              {item.banner_type == 1
                                ? "Dont Miss"
                                : item.banner_type == 2
                                ? "Today's Special"
                                : item.banner_type == 3
                                ? "Photos Section"
                                : null}
                            </td> */}

                            <td width="100">
                              <Link
                                to={`/admin/banner_update/${item._id}`}
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

export default withRouter(Articles);
export let getCompanieslist;
