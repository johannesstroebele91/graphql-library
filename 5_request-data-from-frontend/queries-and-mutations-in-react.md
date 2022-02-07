# Basics

1. Create the query (like with GraphiQL before) (e.g. queries.js)
2. Take that query and bind it to a component (to have access to the returned data) (e.g. MovieList)
3. Enable frontend to be able to communicate with the GraphQL server (By default it is not accepting requests) (e.g. MovieList), see outsourced queries in e.g. queries.js
   - Queries or requests via useQuery():
     - For requesting all data, e.g. movies write `{movies{name ...}}`
     - For requesting only one document, e.g. movie write `query($id){movie(id:$id){name ...})}`
   - Mutations via useMutation(), e.g. `mutation($name: String!){addMovie(name:$name){name ...}}`
