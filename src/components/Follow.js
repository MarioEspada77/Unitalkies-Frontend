import React from "react";

const Follow = props => {
  const { getFollows, getUnfollow, isFollowing } = props;

  return (
    <button onClick={isFollowing ? () => getUnfollow() : () => getFollows()}>
      {isFollowing ? "Unfollow" : "follow"}
    </button>
  );
};

export default Follow;
