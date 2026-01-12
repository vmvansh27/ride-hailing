import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(4000, () =>
    console.log("GraphQL Server running on http://localhost:4000/graphql")
);
