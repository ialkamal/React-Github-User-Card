import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import GitHubCalendar from "react-github-calendar";

const UserResult = ({ user }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "500px",
      marginTop: "25px",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
      height: "auto",
    },
    avatar: {
      backgroundImage: `url(${user.avatar_url})`,
      backgroundSize: "cover",
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {" "}
          </Avatar>
        }
        title={
          <a href={`${user.html_url}`} target={`_blank`}>
            {user.login}
          </a>
        }
      />
      <GitHubCalendar style={{ margin: "0 0 0 10px" }} username={user.login} />
    </Card>
  );
};

export default UserResult;
