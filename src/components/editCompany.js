import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';


import {
  Row,
  Col,
} from 'reactstrap'
import { editCompany } from '../redux/actions/topStoryAction'
import Toast from 'light-toast';




class EditCompany extends React.Component {

  constructor(props) {
    super(props)

    successFulEdit = (parm) => {
      if(parm === "success"){

        Toast.success('Successfully Edit...!!', 2000, () => {
          
        });
      }
    }
    editFail = (parm) => {
      if(parm === "err"){

      Toast.fail('Email Already in use, Try Again.', 2000, () => {

      });
    }
    }
    successFulEdit()
    editFail() 

    
   this.state = props.location.companyInd.company

  }

  company = null
  componentDidMount() {
    console.log(this.props.location.companyInd.company);
    this.company = this.props.location.companyInd.company
    console.log(this.state);
    // this.setState({
    //   ...this.company
    // })
    // console.log(this.state);
    this.forceUpdate()



  }
  state = {
   
  }

  onChangeHandler = (e) => {

    if (e.target.name === "services" && e.target.value === "on") {
      this.setState({
        services: true
      })
      return true
    } else if (e.target.name === "services" && e.target.value === "off") {
      this.setState({
        services: false
      })
      return true
    }

    
    this.setState({
      [e.target.name]: e.target.value
    })
    
  }

  // onTo = (e) => {


  //   if (e.target.value === 'client') {
  //     this.setState({
  //       to_client: true,
  //       to_adviser: false
  //     })
  //   } else {
  //     this.setState({
  //       to_client: false,
  //       to_adviser: true
  //     })
  //   }



  // }


  onSubmit = (e) => {
    console.log("state is "+ this.state , "    Id is " + this.company._id);
    
    e.preventDefault()
    this.props.edit_company(this.company._id, this.state)


  }
  render() {

    // let company = this.props.location.companyInd.company
    // console.log(company);
    

    return (


      <>
        <div class="content-wrapper">
          <div id="order_preview" class="wow fadeInUp content_box"
            style={{ visibility: 'visible', animationName: "fadeInUp" }}>


            <Row className="table-header">

              <Col xs='12' md='12'>
                <h2 class="section-title">Edit Company </h2>
              </Col>


            </Row>


            <div class="row">


              <Row>


                <Col xs='12' md='5'>
                  <form>
                    <div class="form-group">
                      <label for="pwd">Company Name</label>
                      <input type="text" class="form-control" name="company_name"
                        
                        value={this.state ? this.state.company_name : ''}
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    <div class="form-group">
                      <label for="pwd">Work Email</label>
                      <input type="text" class="form-control"
                        // value='work@gmail.com' 
                        name="work_email" 

                        value={this.state ? this.state.work_email : ''}
                        onChange={this.onChangeHandler} />
                    </div>
                    <div class="form-group">
                      <label for="pwd">Phone</label>
                      <input type="text" class="form-control"

                        value={this.state ? this.state.ph_no : ''}

                        name="ph_no" onChange={this.onChangeHandler} />
                      {/* <IntlTelInput
                        containerClassName="intl-tel-input"
                        inputClassName="form-control"
                        style={{
                          width: "100%"
                        }}
                      /> */}
                    </div>

                    <div class="form-group">
                      <label for="pwd">Employee Limit</label>
                      <input type="number" class="form-control"
                        value={this.state ? this.state.employee_limit : ''}

                        // value='13'
                        name="employee_limit" onChange={this.onChangeHandler} />
                    </div>

                    <div class="form-group">
                      <label for="pwd">Payment Type</label>
                      <select class="form-control" name='payment_type' onChange={this.onChangeHandler}>
                        <option value="client">Select Payment Type</option>
                        <option value="" selected>{this.state ? this.state.payment_type : ''}</option>
                        <option value="1" > Cheque</option>
                        <option value="2" >Credit Card</option>
                      </select>
                    </div>


                  </form>
                </Col>

                <Col xs='12' md='5'>
                  <form>
                    <div class="form-group">
                      <label for="pwd">Expense Group</label>
                      <select class="form-control"  name='expense_group' onChange={this.onChangeHandler}>
                        {/* <option value="client">Select Expense Group</option> */}

                        <option value="" selected>{this.state ? this.state.expense_group : ''}</option>

                        <option value="reader">2</option>
                        <option value="reader">3</option>

                      </select>
                    </div>
                    <div class="form-group">
                      <label for="pwd">Expense Image</label>
                      <select class="form-control"  name='expense_image' onChange={this.onChangeHandler}>
                        {/* <option value="client">Select Expense Image</option> */}

                        <option value="before" selected>{this.state ? this.state.expense_image : ''}</option>
                        <option value="client">Yes</option>
                        <option value="reader" >No</option>

                      </select>
                    </div>
                    <div class="form-group">
                      <label for="pwd">Email Templates</label>
                      <select class="form-control" name='email_template' onChange={this.onChangeHandler}>

                        {/* <option value="client">Select Email Templates</option> */}
                        <option value="template" selected>{this.state ? this.state.email_template : ''}</option>

                        <option value="client">1</option>

                        <option value="reader">3</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="pwd">Upload Logo</label>
                      <input type="file" class="form-control" name="image_file" onChange={this.onChangeHandler} />
                    </div>


                    <div class="form-group"
                      style={{
                        marginTop: 50
                      }}
                    >
                      <label for="pwd">Services</label>
                      <label class="switch"
                        style={{ marginLeft: 10 }}
                      >
                        <input type="checkbox" name='services' onChange={this.onChangeHandler} />
                        <span class="checkbox_slider round"></span>
                      </label>
                    </div>
                    <button type="submit" class="btn btn-default" onClick={this.onSubmit}
                
                      style={{ marginTop: 10, float: 'right', padding: '8px 16px', fontSize: 16 }}
                    >Save</button>
                  </form>


                </Col>

              </Row>
            </div>
          </div>
        </div>


      </>


    )

  }

}

let mapStateToProps = (store) => {
  return {
    admin: store.AdminReducer,
    com: store.companyReducer
  }
}

let mapDispatchToProps = (dispatch) => {

  return ({
    edit_company: (id,body) => {
      dispatch(editCompany(id,body))
    },
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCompany));
export let successFulEdit,editFail   