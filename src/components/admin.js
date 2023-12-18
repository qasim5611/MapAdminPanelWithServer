import React from "react";
import Header from "./header/header";
import SignIn from "./signIn";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import {getCompanies} from './Companies'

class Admin extends React.Component {
  constructor(props) {
    super(props);
    getData = () => {
      let token = localStorage.getItem("token");
      let status = this.props.authState.auth.userDetail
      console.log(token);
      this.setState({
        userDetail: status,
      });
      // props.authState
    };
    getData();
  }

  state = {
    userDetail: null,
  };

  render() {
    return (
      <div>
        {
          this.props.authState.auth.userDetail
        //   true 
          ? <Header /> : <SignIn />
        }
      </div>
    );
  }
}
let mapStateToProps = (store) => {
  console.log(store);

  return {
    authState: store,
  };
};
let mapDispatchToProps = (disptch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
export let getData;
