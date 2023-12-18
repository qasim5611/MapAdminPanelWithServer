import React, { useState, useRef, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { createBanner } from "../redux/actions/bannerAction";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { basic, complex, formatting } from "./misc/buttonList";

import Toast from "light-toast";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import MultipleSelect from "./Common/categorySelector";
import API from "./../redux/urlnew";

const CreateNewArticle = (props) => {
  let dispatch = useDispatch();

  const [state, setState] = useState({
    title: null,
    banner_type: 1,
    image: null,
    sub_title: null,
    article_id: null,
    article_name: null,
  });

  const [description, setDescription] = useState(null);
  const [images, setImages] = useState([]);
  const [imagesDB, setImagesDB] = useState([]);
  const [articleList, setArticleList] = useState(false);

  let success = useSelector((state) => state.bannerReducer.msg);

  useEffect(() => {
    if (success) {
      Toast.success("Successfully Created...!!", 2000, () => {});
    }
  }, [success]);
  useEffect(() => {
    axios.get(API + "/api/gets_article").then((result) => {
      setArticleList(result.data);
      setState({
        ...state,
        article_id: result.data[0]._id,
        article_name: result.data[0].title,
      });
    });
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    let obj = {
      ...state,
    };
    // console.log(obj);
    dispatch(createBanner(obj));
  };

  const onChangeHandler = (e) => {
    if (e.target.name == "images") {
      let val = e.target.files[0];
      // let url = URL.createObjectURL(val);
      // setImagesDB([...imagesDB, val]);
      setState({ ...state, image: val });
    } else if (e.target.name == "article_id") {
      debugger;
      let result = articleList.filter((item) => item._id == e.target.value);
      setState({
        ...state,
        [e.target.name]: e.target.value,
        article_name: result[0].title,
      });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };
  const editorRef = useRef < SunEditor > null;
  useEffect(() => {
    // Get underlining core object here
    // Notice that useEffect is been used because you have to make sure the editor is rendered.
    console.log(editorRef.current?.editor.core);
  }, []);
  const handleChange = (content) => {
    setDescription(content); //Get Content Inside Editor
  };
  return (
    <>
      <div class="content-wrapper">
        <div
          id="order_preview"
          class="wow fadeInUp content_box"
          style={{ visibility: "visible", animationName: "fadeInUp" }}
        >
          <Row className="table-header">
            <Col xs="12" md="12">
              <h2 class="section-title">Add Banner</h2>
            </Col>
          </Row>
          <div class="row">
            <Row>
              <Col xs="12" md="9">
                <form>
                  <div class="form-group">
                    <label for="pwd">Banner Title</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="title"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div class="form-group">
                    <label for="pwd">Banner Sub-Title</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="sub_title"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div class="form-group">
                    <label for="pwd">Banner Position</label>
                    <select
                      name="banner_type"
                      id=""
                      class="form-control"
                      onChange={onChangeHandler}
                    >
                      {[
                        { value: null, name: "Select Position" },
                        { value: 1, name: "Dont Miss Banner" },
                        { value: 2, name: "Today's Special" },
                        { value: 3, name: "Photos Part" },
                      ].map((item, ind) => (
                        <option value={item.value} index={ind}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="pwd">Link</label>
                    <select
                      name="article_id"
                      id=""
                      class="form-control"
                      onChange={onChangeHandler}
                    >
                      {articleList.length > 0
                        ? articleList.map((item, ind) => (
                            <option value={item._id} index={ind}>
                              {item.title}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="pwd">Upload Images</label>
                    <input
                      type="file"
                      class="form-control"
                      required
                      name="images"
                      onChange={onChangeHandler}
                    />
                  </div>
                  {/* <div class="form-group featuredItems_out">
                    <input
                      type="checkbox"
                      class=""
                      required
                      name="isFeatured"
                      id="featured_item"
                      onChange={onChangeHandler}
                    />
                    <label for="featured_item">Featured</label>
                  </div> */}
                  <label for="featured_item">Images will be shown here</label>
                  <div
                    class="form-group featuredItems_out"
                    style={{ flexWrap: "wrap" }}
                  >
                    {images.map((item, key) => (
                      <img
                        src={item}
                        alt=""
                        height="100px"
                        width="130px"
                        key={key}
                        style={{ marginLeft: 10, marginTop: 10 }}
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    class="btn btn-default"
                    onClick={onSubmit}
                    style={{
                      marginTop: 10,
                      float: "right",
                      padding: "8px 16px",
                      fontSize: 16,
                    }}
                  >
                    Create
                  </button>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateNewArticle);
export let successFul, createdFail, getPaymentType, getExpenseGroup;
