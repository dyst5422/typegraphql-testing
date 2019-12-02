import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import * as classValidator from 'class-validator';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as typeorm from 'typeorm';
import { UserResolver } from './resolvers/User.resolver';

classValidator.useContainer(Container);
typeorm.useContainer(Container);

typeorm.createConnection().then(async () => {

    const schema = await buildSchema({
        resolvers: [UserResolver],
        container: Container,
    });

    const server = new ApolloServer({
        schema,
        playground: true,
    });

    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);

}).catch(error => console.log(error));
