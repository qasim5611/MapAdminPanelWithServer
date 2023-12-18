import React, { useState, useRef, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { createHeaderItem } from "../redux/actions/HeaderAction";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { basic, complex, formatting } from "./misc/buttonList";

import Toast from "light-toast";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import MultipleSelect from "./Common/categorySelector";

const HeaderAdd = (props) => {
  let dispatch = useDispatch();

  const [state, setState] = useState({
    title: null,
    link: null,
    status: false,
  });
  const [description, setDescription] = useState(null);

  let success = useSelector((state) => state.headerReducer.msg);

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
    dispatch(createHeaderItem(obj));
  };

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
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
              <h2 class="section-title">Add Item In Header</h2>
            </Col>
          </Row>
          <div class="row">
            <Row>
              <Col xs="12" md="9">
                <form>
                  <div class="form-group">
                    <label for="pwd">Header Title</label>
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
                    <label for="pwd">Link</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="link"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div class="form-group">
                    <label for="pwd">Status</label>
                    <select
                      name="status"
                      id=""
                      onChange={onChangeHandler}
                      class="form-control"
                    >
                      <option value="0">Select Status</option>
                      <option value="1">Activate</option>
                      <option value="2">De-Activated</option>
                    </select>
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

export default withRouter(HeaderAdd);
export let successFul, createdFail, getPaymentType, getExpenseGroup;
