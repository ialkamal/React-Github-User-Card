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
      <div>
        <h1>Welcome to React!</h1>
        <User user={this.state.user} followers={this.state.followers} />
        {this.state.followers.map((follower) => {
          return (
            <pre key={follower.id}>{JSON.stringify(follower, null, 2)}</pre>
          );
        })}
      </div>
    );
  }
}
