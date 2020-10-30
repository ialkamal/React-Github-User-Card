import React, { Component } from "react";
import User from "./components/User";
import UserResult from "./components/UserResult";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      followers: [],
      results: [],
      //resultFollowers: [],
      search: "",
      submitted: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/rate_limit")
      .then((res) => {
        console.log("Rate Limit is: ", res.data);
      })
      .catch((err) => console.log(err));

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

  componentDidUpdate() {
    if (this.state.submitted) {
      axios
        .get(
          `https://api.github.com/search/users?q=${this.state.search}&page=1&per_page=10`
        )
        .then((res) => {
          console.log(res);
          this.setState({
            results: res.data.items,
            submitted: false,
            search: "",
            resultFollowers: new Array(res.data.items.length),
          });
          return res.data.items;
        })
        // .then((users) => {
        //   console.log(users);
        //   const promises = [];
        //   const listOfFollowers = [];
        //   users.forEach((user) => {
        //     promises.push(
        //       axios
        //         .get(`https://api.github.com/users/${user.login}/followers`)
        //         .then((res) => {
        //           listOfFollowers.push(res.data);
        //         })
        //         .catch((err) => console.log(err))
        //     );
        //   });
        //   Promise.all(promises).then(() => {
        //     this.setState({
        //       resultFollowers: listOfFollowers,
        //     });
        //   });
        // })
        .catch((err) => {
          console.log(err);
          this.setState({
            submitted: false,
            search: "",
          });
        });
    }
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitted: true,
    });
  };

  render() {
    return (
      <div style={{ width: "1000px", margin: "20px auto" }}>
        <h1 style={{ textAlign: "center" }}>Welcome to Github Cards!</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <User user={this.state.user} followers={this.state.followers} />
          <div style={{ marginTop: "20px", width: "500px" }}>
            <TextField value={this.state.search} onChange={this.handleChange} />
            <Button
              style={{ marginLeft: "10px" }}
              type="submit"
              variant="contained"
              color="default"
              onClick={this.handleSubmit}
            >
              Search
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              color="default"
              onClick={() => {
                this.setState({
                  results: [],
                });
              }}
            >
              Clear
            </Button>
            <h2>Top 10 Results: </h2>
            {this.state.results.map((result) => {
              return <UserResult key={result.id} user={result} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
