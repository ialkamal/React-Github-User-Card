import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function Follower({ follower }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      background: "lightyellow",
      marginBottom: "15px",
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
      backgroundImage: `url(${follower.avatar_url})`,
      backgroundSize: "cover",
    },
  }));
  const classes = useStyles();

  const [followersList, setFollowersList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${follower.login}/followers`)
      .then((res) => {
        console.log(res);
        setFollowersList(res.data);
      })
      .catch((err) => console.log(err));
  }, [follower]);

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {" "}
            </Avatar>
          }
          title={
            <a href={`${follower.html_url}`} target={`_blank`}>
              {follower.login}
            </a>
          }
          subheader={`Followers: ${followersList.length}`}
        />
      </Card>
    </div>
  );
}

export default Follower;
