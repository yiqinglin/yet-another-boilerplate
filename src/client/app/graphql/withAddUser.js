import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

/**
 * Mutation
 */
const ADD_USER = gql`
  mutation addUser($username: String!) {
    addUser(username: $username) {
      _id
      username
    }
  }
`;

const withAddUser = graphql(ADD_USER, {
  props: ({ mutate }) => ({
    addUser: username =>
      mutate({
        variables: { username },
        refetchQueries: ['users']
      })
  })
});

export default withAddUser;
