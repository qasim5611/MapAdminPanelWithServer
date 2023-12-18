import React, { useState, useRef, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { createArticle } from "../redux/actions/teamAction";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { basic, complex, formatting } from "./misc/buttonList";

import Toast from "light-toast";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import MultipleSelect from "./Common/categorySelector";
import SubCategorySelector from "./Common/subCategorySelector";

import './qasim.css';
import handIcon from './../components/SliderImages/hand.png';




const CreateNewArticle = (props) => {




const [checkbox, setCheckbox] = useState(false);


  let dispatch = useDispatch();

  const [state, setState] = useState({
    title: null,
    position: null ,
    image: null,

  });
  const [subCate,setSubCate] = useState(false)
  const [description, setDescription] = useState(null);

  let success = useSelector((state) => state.ArticleReducer.msg);

  useEffect(() => {
    if (success) {
      Toast.success("Successfully Created...!!", 2000, () => {});
    }
  }, [success]);

  const onSubmit = (e) => {
    e.preventDefault();
    let obj = {
      ...state,
      description,
      checkbox,
    };
    dispatch(createArticle(obj));
  };

  const onChangeHandler = (e) => {
    if (e.target.name == "image") {
      let val = e.target.files[0];
      setState({ ...state, [e.target.name]: val });
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


  useEffect(()=>{
    setSubCate(state.category_id)
  },[state.category_id])


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
              <h2 class="section-title">New Team Member</h2>
            </Col>
          </Row>
          <div class="row">
            <Row>
              <Col xs="12" md="9">
                <form>
                  <div class="form-group">
                    <label for="pwd">Member Name</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="title"
                      onChange={onChangeHandler}
                      value={state.title}
                    />
                  </div>

                  <div class="form-group">
                    <label for="pwd">Member Position</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="position"
                      onChange={onChangeHandler}
                      value={state.position}
                    />
                  </div>

                  {/* <div class="form-group">
                    <label for="pwd">Category</label>
                    <MultipleSelect changeHandler={onChangeHandler} />
                  </div>
                  <div class="form-group">
                    <label for="pwd">Sub-Category</label>
                    <SubCategorySelector changeHandler={onChangeHandler} categoryID={subCate}/>
                  </div> */}

                  <div class="form-group">
                    <label for="pwd">Descriptions</label>

                    <SunEditor
                      setOptions={{
                        height: 200,
                        buttonList: formatting,
                        buttonList: basic,
                        buttonList: complex,
                      }}
                      onChange={handleChange}
                    />
                  </div>

                  <div class="form-group">
                    <label for="pwd">Upload Image</label>
                    <input
                      type="file"
                      class="form-control"
                      required
                      name="image"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <br />
                  <div
                    class="form-group"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <label for="pwd">
                      <blink>
                        <img src={handIcon} />
                      </blink>
                      <blockquote>
                        Check if you want to Show this in Landing Page
                      </blockquote>
                    </label>
                    <input
                      type="checkbox"
                      class="form-control"
                      required
                      name="isFeatured"
                      onChange={() => setCheckbox(!checkbox)}
                    />
                  </div>

                  {checkbox ? (
                    <div>checkbox active</div>
                  ) : (
                    <div>checkboc disable</div>
                  )}
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