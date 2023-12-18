import React, { useState, useRef, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { createSubCategory } from "../redux/actions/CategoryAction";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { basic, complex, formatting } from "./misc/buttonList";

import Toast from "light-toast";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import MultipleSelect from "./Common/categorySelector";
import API from "./../redux/urlnew";

const CreateCategory = (props) => {
  let dispatch = useDispatch();
  const [state, setState] = useState({
    category_id: null,
    sub_category_name: null,
  });

  const [categories, setCategories] = useState(false);

  useEffect(() => {
    axios.get(API + "/api/categories/get_all").then((result) => {
      setCategories(result.data);
      setState({ ...state, category_id: result.data[0]._id });
    });
  }, []);

  let success = useSelector((state) => state.categoryReducer.msg);

  useEffect(() => {
    if (success) {
      Toast.success("Successfully Created...!!", 2000, () => {});
    }
  }, [success]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubCategory(state));
  };
  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
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
              <h2 class="section-title">New Sub-Category</h2>
            </Col>
          </Row>
          <div class="row">
            <Row>
              <Col xs="12" md="9">
                <form>
                  <div class="form-group">
                    <label for="pwd">Category</label>
                    <MultipleSelect changeHandler={onChangeHandler} />
                  </div>
                  <div class="form-group">
                    <label for="pwd">Sub-Category Title</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="sub_category_name"
                      onChange={onChangeHandler}
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
export default withRouter(CreateCategory);
export let successFul, createdFail, getPaymentType, getExpenseGroup;
