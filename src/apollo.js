import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "localhost:3001/"
});

export default client;