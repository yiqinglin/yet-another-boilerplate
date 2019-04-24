// @flow
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

type User = {
  _id: string,
  username: string
}

type Props = {
  isFetching: boolean,
  users: [User],
  addUser: (string) => User
}

const userList = (isFetching, users) => {
  if (isFetching) return 'Loading...';
  if (!users || users.length < 1) {
    return 'No user found.';
  }
  return (
    <ul>
      {users.map(user => (
        <li key={user._id}>{user.username}</li>
      ))}
    </ul>
  );   
}

const Users = ({ isFetching, users, addUser }) => {
  const [newUser, setNewUser] = useState('');

  return (
    <div>
      <h2>Users</h2>
      {userList(isFetching, users)}
      <div>
        <input
          type='text'
          name='username'
          placeholder='username'
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
        />
        <button onClick={() => addUser(newUser)}>Add User</button>
      </div>
    </div>
  );
}

/**
 * Query
 */
const GET_USERS = gql`
query users{
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
})

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
    addUser: (username) => mutate({
      variables: { username },
      refetchQueries: ['users']
    })
  })
});

export default compose(withUsers, withAddUser)(Users);