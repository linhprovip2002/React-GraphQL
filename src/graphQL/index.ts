import { gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
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
    links {
      id
      createdAt
      url
      description
    }
  }
}
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export {
    CREATE_LINK_MUTATION,
    FEED_QUERY,
    SIGNUP_MUTATION,
    LOGIN_MUTATION
    }