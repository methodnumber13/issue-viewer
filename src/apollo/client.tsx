import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';

// in nomral i prefer to store creds in .env file
// leave it here just for testing
const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql' || process.env.GRAPHQL_API,
  headers: {
    authorization: `Bearer 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`,
  },
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
