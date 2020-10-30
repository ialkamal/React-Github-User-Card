import React from "react";
import Follower from "./Follower";

function ListOfFollowers({ followers }) {
  return (
    <div>
      {followers.map((follower) => {
        return <Follower key={follower.id} follower={follower} />;
      })}
    </div>
  );
}

export default ListOfFollowers;
