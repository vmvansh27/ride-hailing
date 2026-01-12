import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
} from "graphql";

import { Payment } from "../rest/models/index.js";


export const PaymentType = new GraphQLObjectType({
    name: "Payment",
    fields: () => ({
        payment_id: { type: GraphQLInt },
        ride_id: { type: GraphQLInt },
        amount: { type: GraphQLFloat },
        method: { type: GraphQLString },
        status: { type: GraphQLString },
    }),
});


export const paymentQueries = {
    payment: {
        type: PaymentType,
        args: {
            payment_id: { type: GraphQLInt },
        },
        resolve: (_, args) => {
            return Payment.findByPk(args.payment_id);
        },
    },
};

// MUTATION
export const paymentMutations = {
    createPayment: {
        type: PaymentType,
        args: {
            ride_id: { type: GraphQLInt },
            amount: { type: GraphQLFloat },
            method: { type: GraphQLString },
        },
        resolve: (_, args) => {
            return Payment.create({
                ride_id: args.ride_id,
                amount: args.amount,
                method: args.method,
                status: "completed",
            });
        },
    },
};
