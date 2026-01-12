import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
} from "graphql";

import { Ride } from "../rest/models/index.js";


export const RideType = new GraphQLObjectType({
    name: "Ride",
    fields: () => ({
        ride_id: { type: GraphQLInt },
        rider_id: { type: GraphQLInt },
        driver_id: { type: GraphQLInt },
        pickup_location: { type: GraphQLString },
        drop_location: { type: GraphQLString },
        status: { type: GraphQLString },
        fare: { type: GraphQLFloat },
    }),
});

// QUERIES
export const rideQueries = {
    rides: {
        type: new GraphQLList(RideType),
        resolve: () => Ride.findAll(),
    },

    rideById: {
        type: RideType,
        args: { ride_id: { type: GraphQLInt } },
        resolve: (_, args) => Ride.findByPk(args.ride_id),
    },
};

// MUTATIONS
export const rideMutations = {
    createRide: {
        type: RideType,
        args: {
            rider_id: { type: GraphQLInt },
            pickup_location: { type: GraphQLString },
            drop_location: { type: GraphQLString },
        },
        resolve: (_, args) => {
            return Ride.create({
                rider_id: args.rider_id,
                pickup_location: args.pickup_location,
                drop_location: args.drop_location,
                status: "requested",
            });
        },
    },
};
