import React from "react";
import styled from "styled-components";

const FollowButton = styled.button`
  display: inline-block;
  background-color: ${({ theme, isFollowing }) =>
    isFollowing ? "red" : theme.secondary};
  text-align: center;
  border: 1px solid ${({ theme, isFollowing }) => theme.primary};
  border-radius: 0.25rem;
  padding: 4px;
  width: 120px;
`;

const Follow = props => {
  const { getFollows, getUnfollow, isFollowing } = props;

  return (
    <FollowButton
      isFollowing={isFollowing}
      onClick={isFollowing ? () => getUnfollow() : () => getFollows()}
    >
      {isFollowing ? "Unfollow" : "follow"}
    </FollowButton>
  );
};

export default Follow;
