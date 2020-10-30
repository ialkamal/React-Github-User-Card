import React, { useState } from "react";
import ListOfFollowers from "./ListOfFollowers";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GitHubCalendar from "react-github-calendar";
import { Typography } from "@material-ui/core";

const User = ({ user, followers }) => {
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
    },
    avatar: {
      backgroundImage: `url(${user.avatar_url})`,
      backgroundSize: "cover",
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFollowers = () => {
    if (followers) return followers.length;
    return "loading...";
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {" "}
          </Avatar>
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={
          <a href={`${user.html_url}`} target={`_blank`}>
            {user.login}
          </a>
        }
        subheader={`Followers: ${handleFollowers()}`}
      />
      <GitHubCalendar style={{ margin: "0 0 0 10px" }} username={user.login} />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Followers:</Typography>
          <ListOfFollowers followers={followers} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default User;
