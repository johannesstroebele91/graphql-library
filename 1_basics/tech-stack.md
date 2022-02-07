# Explanation

GraphQL is compatible with a lot of frameworks

- in the frontend: React, Angular, Vue.js
- in the backend: Node.js, Express, ...

# Tech Sack

1. A GrapQL server needs to be installed on a **Node.js server**

   - where also a e.g. an express app is installed

2. There, the **GraphQL server** defines how the graph looks

   - so the data like movies, ...
   - and the relation between them

3. Further, how the **different entry points** into the graph look

   - so where the query can be made to
   - and what data it can retrieve from

4. Hooking up the GraphQL server to a **MongoDB**

   - where the data is acutally stored
   - which is a NoSQL database,
   - which allows to store documents (data) in collections
   - instead of records and tables in a SQL database
   - It does not enforce a schema, like SQL databases,
   - but it still allows to create a schema if needed

5. After the backend is completed,

   - a client side app (e.g. React) is created
   - which enables to make queries to the GraphQL server
   - and retriev that data
   - which can then be used to show the data to the user in the browser

6. React with Apollo or GraphiQL explorer can be used
   - to let users trigger queries
   - from the browser
