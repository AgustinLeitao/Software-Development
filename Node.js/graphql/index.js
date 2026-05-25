import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';

const GRAPHQL_PORT = 8080;
const graphQLServer = express();

graphQLServer.use('/', graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(`Running server on port localhost:${GRAPHQL_PORT}`));