import React, { useState, useRef, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { updateHeader } from "../redux/actions/HeaderAction";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { basic, complex, formatting } from "./misc/buttonList";

import Toast from "light-toast";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import MultipleSelect from "./Common/categorySelector";
import API from "./../redux/urlnew";

const HeaderEdit = (props) => {
  let dispatch = useDispatch();
  let item_id = props.match.params.id;
  const [state, setState] = useState({
    title: null,
    link: null,
    status: false,
  });
  const [description, setDescription] = useState(null);

  let success = useSelector((state) => state.headerReducer.msg);

  useEffect(() => {
    if (success) {
      Toast.success("Successfully Updated...!!", 2000, () => {});
    }
  }, [success]);
  useEffect(() => {
    axios.post(API + "/api/header/get_one", { _id: item_id }).then((result) => {
      setState(result.data);
    });
  }, [item_id]);

  const onSubmit = (e) => {
    e.preventDefault();
    let obj = {
      ...state,
      description,
    };
    dispatch(updateHeader(obj));
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
              <h2 class="section-title">Edit Item In Header</h2>
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
                      setContents={state.description}
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
                      value={state.link}
                    />
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

export default withRouter(HeaderEdit);
export let successFul, createdFail, getPaymentType, getExpenseGroup;
