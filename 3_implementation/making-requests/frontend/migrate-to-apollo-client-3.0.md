# Basics

There are not many new changes,

- just that practically all packages from apollo for the client
- are now available via `@apollo/client` and its subfolders

A few examples:

- `import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';` // NOT `apollo-boost`
- `import { WebSocketLink } from '@apollo/client/link/w';` // NOT `apollo-link-ws`
- `import { useQuery, useMutation, useSubscription } from '@apollo/client';` // NOT `@apollo/react-hooks`

The fully upgraded code for the last two apps can be found on this GitHub page:

- Chat app: https://github.com/uptoskill/graphql-chat/commit/037e2cc2510315c6ab50572cb1433c2c3d219e18
- Job Board: https://github.com/uptoskill/graphql-job-board/commit/e5a9b597583fff29c885a42c049a83ed2e1186c0
