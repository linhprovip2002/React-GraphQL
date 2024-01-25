import { gql } from "@apollo/client";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const FEED_QUERY = gql`
  {
    feed {
      id
      count
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;
const EDIT_LINK_MUTATION = gql`
  mutation EditLink($editLinkId: ID!, $url: String!, $description: String!) {
    editLink(id: $editLinkId, url: $url, description: $description) {
      id
      url
      description
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;
const DELETE_LINK_MUTATION = gql`
  mutation DeleteLink($deleteLinkId: ID!) {
    deleteLink(id: $deleteLinkId) {
      message
      error
    }
  }
`;
const VOTE_MUTATION = gql`
  mutation Vote($linkId: ID!) {
    vote(linkId: $linkId) {
      message
    }
  }
`;
export {
  CREATE_LINK_MUTATION,
  FEED_QUERY,
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  DELETE_LINK_MUTATION,
  EDIT_LINK_MUTATION,
  VOTE_MUTATION,
};
