import React, { useState, useRef, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { createEvent } from "../redux/actions/Award_action";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { basic, complex, formatting } from "./misc/buttonList";

import Toast from "light-toast";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import MultipleSelect from "./Common/categorySelector";
import SubCategorySelector from "./Common/subCategorySelector";

const AwardCreateNew = (props) => {
  let dispatch = useDispatch();

  const [state, setState] = useState({
    title: null,
    date: null,
    time: null,
    host: null,
    place: null,
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
    };
    dispatch(createEvent(obj));
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
          // style={{ visibility: "visible", animationName: "fadeInUp" }}
        >
          <Row className="table-header">
            <Col xs="12" md="12">
              <h2 class="section-title">Add New Events</h2>
            </Col>
          </Row>
          <div class="row">
            <Row>
              <Col xs="12" md="9">
                <form>
                  <div class="form-group">
                    <label for="pwd">title</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="title"
                      onChange={onChangeHandler}
                      value={state.title}
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

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div class="form-group" style={{ width: "48%" }}>
                      <label for="pwd"> Event Date </label>
                      <input
                        type="date"
                        class="form-control"
                        required
                        name="date"
                        onChange={onChangeHandler}
                      />
                    </div>

                    <div class="form-group" style={{ width: "48%" }}>
                      <label for="pwd"> Event Time </label>
                      <input
                        type="time"
                        class="form-control"
                        required
                        name="time"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="pwd"> Event Host </label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="host"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div class="form-group">
                    <label for="pwd"> Event Place </label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="place"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div class="form-group">
                    <label for="pwd">Pre Event Photo </label>
                    <input
                      type="file"
                      class="form-control"
                      required
                      name="image"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div class="form-group">
                    <label for="pwd">Detail Descriptions</label>

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

export default withRouter(AwardCreateNew);
export let successFul, createdFail, getPaymentType, getExpenseGroup;
