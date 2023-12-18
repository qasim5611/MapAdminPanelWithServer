import React, { useState, useRef, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { UpdateSidebar } from "../redux/actions/SideBarAction";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { basic, complex, formatting } from "./misc/buttonList";

import Toast from "light-toast";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import MultipleSelect from "./Common/categorySelector";
import API from "./../redux/urlnew";

const FooterEdit = (props) => {
  let dispatch = useDispatch();
  const [state, setState] = useState({ sidebar_position: null });
  const [description, setDescription] = useState(null);
  let item_id = props.match.params.id;
  let success = useSelector((state) => state.sidebarReducer.msg);

  useEffect(() => {
    if (success) {
      Toast.success("Successfully Update...!!", 2000, () => {});
    }
  }, [success]);

  useEffect(() => {
    axios
      .post(API + "/api/sidebar/get_one", { _id: item_id })
      .then((result) => {
        console.log(result.data);
        setState(result.data);
        setDescription(result.data.description);
      });
  }, [item_id]);

  const onSubmit = (e) => {
    e.preventDefault();
    let obj = {
      ...state,
      description,
      _id: item_id,
    };
    dispatch(UpdateSidebar(obj));
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
  }, [description]);

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
              <h2 class="section-title">New SideBar Section</h2>
            </Col>
          </Row>
          <div class="row">
            <Row>
              <Col xs="12" md="9">
                <form>
                  <div class="form-group">
                    <label for="pwd">SideBar Position</label>
                    <select
                      name="sidebar_position"
                      id=""
                      class="form-control"
                      onChange={onChangeHandler}
                    >
                      <option value="0">
                        Select Sidebar Position From Top to Bottom
                      </option>
                      <option
                        value="1"
                        selected={state.sidebar_position == 1 && "selected"}
                      >
                        First
                      </option>
                      <option
                        value="2"
                        selected={state.sidebar_position == 2 && "selected"}
                      >
                        Second
                      </option>
                      <option
                        value="3"
                        selected={state.sidebar_position == 3 && "selected"}
                      >
                        Third
                      </option>
                      <option
                        value="4"
                        selected={state.sidebar_position == 4 && "selected"}
                      >
                        Forth
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="pwd">Sidebar List</label>
                    <SunEditor
                      setContents={description}
                      setOptions={{
                        height: 200,
                        buttonList: formatting,
                        buttonList: basic,
                        buttonList: complex,
                      }}
                      onChange={handleChange}
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
export default withRouter(FooterEdit);
export let successFul, createdFail, getPaymentType, getExpenseGroup;
