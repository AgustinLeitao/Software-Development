import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
    
    input FriendInput {
    id: ID
    firstName: String!
    lastName: String
    gender: Gender
    language: String
    age : Int
    email: String
    }

    input ContactInput {
        firstName: String
        lastName: String
    }

    enum Gender {
        MALE
        FEMALE
    }

    type Friend {
        id: ID
        firstName: String
        lastName: String
        gender: Gender
        age: Int
        language: String
        email: String
        contacts: [Contact]
    }
    
    type Alien {
        id: ID,
        firstName: String,
        lastName: String,
        planet: String
    }

    type Contact {
        firstName: String
        lastName: String
    }

    type Query {
        getFriend(id : ID!): Friend
        getFriends: [Friend]
        getAliens: [Alien]
    }

    type Mutation{
        createFriend(input: FriendInput) : Friend
        updateFriend(input: FriendInput) : Friend
        deleteFriend(id: ID!) : String
    }
`;

export const schema = makeExecutableSchema({typeDefs, resolvers});