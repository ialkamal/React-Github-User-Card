import React from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import GitHubCalendar from "react-github-calendar";

class Follower extends React.Component {
  state = {
    followersList: [],
  };

  componentDidMount() {
    if (this.props.follower)
      axios
        .get(`https://api.github.com/users/${this.props.follower.login}/followers`)
        .then((res) => {
          this.setState({
            followersList: res.data,
          });
        })
        .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Card
          style={{
            maxWidth: "480px",
            marginBottom: "15px",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                style={{
                  backgroundImage: `url(${this.props.follower.avatar_url})`,
                  backgroundSize: "cover",
                }}
              >
                {" "}
              </Avatar>
            }
            title={
              <a href={`${this.props.follower.html_url}`} target={`_blank`}>
                {this.props.follower.login}
              </a>
            }
            subheader={`Followers: ${this.state.followersList.length}`}
          />
          <GitHubCalendar
            style={{ margin: "0 0 0 10px" }}
            username={this.props.follower.login}
          />
        </Card>
      </div>
    );
  }
}

export default Follower;
