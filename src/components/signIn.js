import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userAuth } from "../redux/actions/authAction";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputFieldx: {
    fontSize: "30px",
  },
});
class SignIn extends React.Component {
  constructor() {
    super();
    errFunction = () => {
      this.setState({
        msg: "Invalid Email or Password.",
        loader: false,
      });
    };
    errFunction();
  }
  state = {
    email: null,
    password: null,
    loader: false,
    role: null
  };
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.setState({
      loader: true,
    });
    this.props.loginUser(this.state);
  };
  render() {
    return (
      <Container
        component="main"
        maxWidth="xs"
        style={{
          marginTop: 180,
        }}
      >
        <CssBaseline />
        <div className={this.props.paper}>
          <Typography component="h1" variant="h2">
            Sign in
          </Typography>

          <form
            style={{
              marginTop: 30,
            }}
          >
            <div class="form-group">
              <label for="pwd">Email</label>
              <input
                type="text"
                class="form-control"
                name="email"
                style={{ width: 400 }}
                onChange={this.onChangeHandler}
              />
            </div>
            <div class="form-group">
              <label for="pwd">Password</label>
              <input
                type="password"
                class="form-control"
                name="password"
                onChange={this.onChangeHandler}
              />
            </div>
            {/* <div class="form-group">
              <label for="pwd">Role</label>
              <div className="">
                <input
                  type="radio"
                  class=""
                  name="role"
                  value='admin'
                  id="admin"
                  onChange={this.onChangeHandler}
                  />
                <label for="admin" style={{marginLeft: 10}}>Admin</label>
              </div>
              <div className="">
                <input
                  type="radio"
                  class=""
                  name="role"
                  value='editor'
                  id='editor'
                  onChange={this.onChangeHandler}
                />
                <label for="editor" style={{marginLeft: 10}}>Editor</label>
              </div>
            </div> */}

            {this.state.msg ? (
              <div
                style={{
                  textAlign: "right",
                  color: "#e60000d4",
                }}
              >
                <label
                  for="pwd"
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  {" "}
                  {this.state.msg}{" "}
                </label>
              </div>
            ) : (
              ""
            )}

            <div>
              {this.state.loader ? (
                <CircularProgress
                  color="secondary"
                  style={{
                    float: "right",
                  }}
                />
              ) : (
                <button
                  type="submit"
                  class="btn btn-default yesBtn"
                  style={{
                    marginTop: 10,
                    float: "right",
                    padding: "8px 16px",
                    fontSize: 16,
                  }}
                  onClick={this.submitHandler}
                >
                  Sign In Now
                </button>
              )}
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

let mapStateToProps = (store) => {
  console.log(store);

  return {
    userdetail: store.auth,
  };
};



let mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (body) => {
      dispatch(userAuth(body));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignIn))
);
export let errFunction;
