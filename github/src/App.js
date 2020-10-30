import React, { Component } from "react";
import User from "./components/User";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      followers: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/ialkamal")
      .then((res) => {
        this.setState({
          user: res.data,
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("https://api.github.com/users/ialkamal/followers")
      .then((res) => {
        this.setState({
          followers: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div style={{ width: "1000px", margin: "20px auto" }}>
        <h1 style={{ textAlign: "center" }}>Welcome to Github Cards!</h1>
        <User user={this.state.user} followers={this.state.followers} />
      </div>
    );
  }
}
