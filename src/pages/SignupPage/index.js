import React, { Component } from "react";
import { connect } from "react-redux";
import { replace } from "connected-react-router";
import { routes } from "../../router";
import {
  userSignup,
  bandSignup,
  adminSignup,
  getUserInfo,
} from "../../actions/users";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { Container } from "./style";
import signupForm from "./form";

class Signup extends Component {
  state = {
    form: {
      description: "",
    },
    user: "normal",
    isBand: false,
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");

    if (token && this.props.user.length === 0) {
      this.props.getInfo();
    }

    if (this.props.user && token) {
      switch (this.props.user.type) {
        case "normal":
          this.props.goToSearch();
          break;

        case "band":
          if (!this.props.user.approved) {
            this.props.goToNotApproved();
          } else {
            this.props.goToSearch();
          }
          break;

        case "admin":
          break;

        default:
          return true;
      }
    }
  };

  componentDidUpdate = () => {
    const token = localStorage.getItem("token");

    if (token && this.props.user.length === 0) {
      this.props.getInfo();
    }

    if (this.props.user && token) {
      switch (this.props.user.type) {
        case "normal":
          this.props.goToSearch();
          break;

        case "band":
          if (!this.props.user.approved) {
            this.props.goToNotApproved();
          } else {
            this.props.goToSearch();
          }
          break;

        case "admin":
          break;

        default:
          return true;
      }
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  handleUserOption = (e) => {
    this.setState({
      user: e.target.value,
    });

    if (e.target.value === "band") {
      this.setState({
        isBand: true,
      });
    } else {
      this.setState({
        isBand: false,
      });
    }
  };

  handleDescription = (e) => {
    this.setState({
      form: { ...this.state.form, description: e.target.value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.user === "admin") {
      this.props.AdminSignup(this.state.form);
    } else if (this.state.user === "band") {
      this.props.BandSignup(this.state.form);
    } else {
      this.props.UserSignup(this.state.form);
    }
  };

  render() {
    return (
      <Container>
        <div className="background">
          <img
            src={"https://blush.ly/CISPScGbv/p"}
            alt="Duas pessoas sentadas no sofá"
          />
        </div>
        <div className="formWrapper">
          <form onSubmit={this.handleSubmit}>
            <h1>Inscreva-se já e comece a curtir.</h1>
            {signupForm.map((input) => {
              return (
                <div key={input.name}>
                  <TextField
                    className="inputs"
                    variant="outlined"
                    label={input.label}
                    required
                    name={input.name}
                    type={input.type}
                    inputProps={{
                      pattern: input.pattern,
                      title: input.title,
                    }}
                    value={this.state.form[input.name] || ""}
                    onChange={this.handleInputChange}
                  />
                </div>
              );
            })}

            {this.state.isBand && (
              <TextField
                variant="outlined"
                label={"Descrição"}
                required
                name={"description"}
                type={"text"}
                value={this.state.form.description || ""}
                onChange={this.handleDescription}
              />
            )}

            <Select value={this.state.user} onChange={this.handleUserOption}>
              <MenuItem value={"normal"}>Normal</MenuItem>
              <MenuItem value={"band"}>Banda</MenuItem>
              {this.props.user.type === "admin" && (
                <MenuItem value={"admin"}>Administrador</MenuItem>
              )}
            </Select>

            <Button
              className="button"
              color="primary"
              variant="contained"
              type="submit"
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.bands.user,
});

const mapDispatchToProps = (dispatch) => ({
  UserSignup: (body) => dispatch(userSignup(body)),
  BandSignup: (body) => dispatch(bandSignup(body)),
  AdminSignup: (body) => dispatch(adminSignup(body)),
  getInfo: () => dispatch(getUserInfo()),
  goToSearch: () => dispatch(replace(routes.search)),
  goToApprovation: () => dispatch(replace(routes.approvation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
