import 'babel-polyfill';
import "isomorphic-fetch"
import bodyParser from 'body-parser';
import express from 'express';
import settings from 'settings';
import mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from './graphql'


/**
 * Initialize the database.
 */
mongoose.connect(settings.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB at', settings.MONGO_URI))
  .catch(error => console.log(error));

/**
 * Initialize the app
 */
const app = express();

/**
 * Support json & urlencoded requests.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * Set up Apollo Server
 */

const server = new ApolloServer(schema);
server.applyMiddleware({ app });

/**
 * Initialize the database.
 */
mongoose.connect(settings.MONGO_URI, { useNewUrlParser: true });

/**
 * Serve files in the /public directory as static files.
 */
app.use(express.static('public'));

/**
 * By default, serve our index.html file
 */
app.get('*', (req, res) => res.sendFile(`${settings.APP_ROOT}/index.html`));

/**
 * Run the server
 */
app.listen(settings.APP_PORT, () => console.log(`App listening on port ${settings.APP_PORT}!`));
