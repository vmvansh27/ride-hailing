import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { rideQueries, rideMutations } from "./ride.resolver.js";
import { paymentQueries, paymentMutations } from "./payment.resolver.js";

const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...rideQueries,
        ...paymentQueries,
    },
});

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...rideMutations,
        ...paymentMutations,
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
