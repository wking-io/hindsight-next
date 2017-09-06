import { ApolloClient, createNetworkInterface } from 'react-apollo';
import store from 'store';
import fetch from 'isomorphic-fetch';
import { GC_AUTH_TOKEN } from '../helpers/constants';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj70whc7z00qu0177u9d86wyf', // Server URL (must be absolute)
  });

  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        const token = store.get(GC_AUTH_TOKEN);
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
      },
    },
  ]);

  return new ApolloClient({
    initialState,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface,
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
