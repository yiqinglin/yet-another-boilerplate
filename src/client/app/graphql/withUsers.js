import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

/**
 * Query
 */
const GET_USERS = gql`
  query users {
    users {
      _id
      username
    }
  }
`;

const withUsers = graphql(GET_USERS, {
  props: ({ data }) => ({
    isFetching: data.loading,
    users: data.users
  })
});

export default withUsers;
