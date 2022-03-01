**How to setup**

1. Create client folder
2. Install react `npx create-react-app client --use-npm`
3. Setup code for React app e.g. `chat/job-board/`
4. Install apollo client library `npm i @apollo/client`
5. For older versions of Apollo Client migrate to 3.0 that were installed via `npm install apollo-boost`
6. Setup an apollo client instance `job-board/client/src/requests.js`
7. Install graphql package to pharse queries `npm install graphql`
8. Setup GraphQL queries `chat-app/client/src/graphql/queries.js`
9. Write requests via
   1. Apollo React that uses Apollo Client under the hood `making-requests_with-hooks.md` or
   2. A more barebone directly via Apollo Client that can be used with Vanilla JS, Vue.js, .. `making-requests_without-hooks.md`

# How to migrate to Apollo Client 3.0

Install the new version `npm i @apollo/client` which leads to

- not many new changes,
- just that practically all packages from apollo for the client
- are now available via `@apollo/client` and its subfolders

Examples:

- `import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';` // NOT `apollo-boost`
- `import { WebSocketLink } from '@apollo/client/link/w';` // NOT `apollo-link-ws`
- `import { useQuery, useMutation, useSubscription } from '@apollo/client';` // NOT `@apollo/react-hooks`

The fully upgraded code

- for the two apps
- can be found as follows:
  - Chat app: https://github.com/uptoskill/graphql-chat/commit/037e2cc2510315c6ab50572cb1433c2c3d219e18
  - Job Board: https://github.com/uptoskill/graphql-job-board/commit/e5a9b597583fff29c885a42c049a83ed2e1186c0
