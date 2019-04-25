// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from 'app/components/App';

const client = new ApolloClient({ uri: '/graphql' });

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

const appRoot = document.getElementById('app');

if (appRoot != null) {
  ReactDOM.render(<ApolloApp />, appRoot);
}
