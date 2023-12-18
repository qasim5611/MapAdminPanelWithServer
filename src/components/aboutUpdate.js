import React, { useState, useRef, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { updateStory } from "../redux/actions/topStoryAction";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { basic, complex, formatting } from "./misc/buttonList";

import Toast from "light-toast";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import MultipleSelect from "./Common/categorySelector";
import { indigo } from "@material-ui/core/colors";

const StoryUpdate = (props) => {
  console.log(props.match.params.id);
  let dispatch = useDispatch();

  const [state, setState] = useState({
    id: props.match.params.id,
  });



  const [description, setDescription] = useState(null);


  let successfully = useSelector((state) => state.topStoryReducer.isStoryUpdate);
  useEffect(() => {
    console.log(successfully);
    if (successfully) {
      Toast.success("Successfully Updated...!!", 2000, () => {});
    }
  }, [successfully]);


  const onSubmit = (e, id) => {
    e.preventDefault();
    let obj = {
      ...state,
    };
    if(description)
    obj.description = description
    console.log(obj);
    dispatch(updateStory(obj));
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
              <h2 class="section-title">Update Descriptions</h2>
            </Col>
          </Row>
          <div class="row">
            <Row>
              <Col xs="12" md="9">
                <form>
                  {/* <div class="form-group">
                    <label for="pwd">Story Title</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="storytitle"
                      onChange={onChangeHandler}
                    //   value={state.title}
                    />
                  </div> */}

                  {/* <div class="form-group">
                    <label for="pwd">Category</label>
                    <MultipleSelect changeHandler={onChangeHandler} />
                  </div> */}

                  <div class="form-group">
                    <label for="pwd">Update About Descriptions</label>

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

                  {/* <div class="form-group">
                    <label for="pwd">Upload Image</label>
                    <input
                      type="file"
                      class="form-control"
                      required
                      name="image"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div class="form-group featuredItems_out">
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
                    onClick={(e) => onSubmit(e, props.match.params.id)}
                    style={{
                      marginTop: 10,
                      float: "right",
                      padding: "8px 16px",
                      fontSize: 16,
                    }}
                  >
                    Update
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

export default withRouter(StoryUpdate);
export let successFul, createdFail, getPaymentType, getExpenseGroup;
