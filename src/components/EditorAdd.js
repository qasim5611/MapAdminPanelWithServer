import React, { useState  , useEffect} from "react";
import { withRouter, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { createEditor } from "../redux/actions/EditorAction";

import Toast from "light-toast";
import axios from "axios";

import { Row, Col, Container } from "reactstrap";

const AddEditor = () => {
  let dispatch = useDispatch();

  let admin_id = useSelector(state=> state.auth.message)

  
  useEffect(() => {
    if (admin_id) {
      Toast.success("succussfully...!!!", 2000, () => {});
    }
  }, [admin_id]);

console.log(admin_id);
  const [state, setState] = useState({
    name: null,
    email: null,
    password: null,
    image: null,
    isEditor: true,
    admin_id
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createEditor(state));
  };

  const onChangeHandler = (e) => {
    if (e.target.name == "image") {
      let val = e.target.files[0];
      setState({ ...state, [e.target.name]: val });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
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
              <h2 class="section-title">Add New Editor</h2>
            </Col>
          </Row>
          <div class="row">
            <Row>
              <Col xs="12" md="8">
                <form>
                  <div class="form-group">
                    <label for="pwd">Full Name</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      name="name"
                      onChange={onChangeHandler}
       
                    />
                  </div>
                  <div class="form-group">
                    <label for="pwd">Email</label>

                    <input
                      type="text"
                      class="form-control"
                      required
                      name="email"
                      onChange={onChangeHandler}
            
                    />
                      {/* <input
                      type="text"
                      class="form-control"
                      value={true}
                      required
                      style={{display:'none'}}
                      name="isEditor"
                      onChange={onChangeHandler}
            
                    /> */}
                  </div>
                  <div class="form-group">
                    <label for="pwd">Password</label>

                    <input
                      type="password"
                      class="form-control"
                      required
                      name="password"
                      onChange={onChangeHandler}
                
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
 
export default withRouter(AddEditor);
export let successFul, createdFail, getPaymentType, getExpenseGroup;
