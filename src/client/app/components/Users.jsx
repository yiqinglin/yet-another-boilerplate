/* eslint-disable no-underscore-dangle */
// @flow
import React, { useState } from 'react';
import { compose } from 'react-apollo';
import withAddUser from 'app/graphql/withAddUser';
import withUsers from 'app/graphql/withUsers';

type UserType = {
  _id: string,
  username: string
};

type PropsType = {
  isFetching: boolean,
  users: Array<UserType>,
  addUser: string => UserType
};

const userList = (isFetching: boolean, users: Array<UserType>) => {
  if (isFetching) return 'Loading...';
  if (!users || users.length < 1) {
    return 'No user found.';
  }
  return (
    <ul>
      {users.map((user: UserType) => (
        <li key={user._id}>{user.username}</li>
      ))}
    </ul>
  );
};

const Users = ({ isFetching, users, addUser }: PropsType) => {
  const [newUser, setNewUser] = useState('');

  return (
    <div>
      <h2>Users</h2>
      {userList(isFetching, users)}
      <div>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
        />
        <button type="submit" onClick={() => addUser(newUser)}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default compose(
  withUsers,
  withAddUser
)(Users);
