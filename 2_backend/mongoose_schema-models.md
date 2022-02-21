- [GraphQL vs Mongoose Schema](#graphql-vs-mongoose-schema)
- [MongoDB Models](#mongodb-models)
- [MongoDB Documents](#mongodb-documents)

# GraphQL vs Mongoose Schema

GraphQL schema defines the graph, so

- the objects types
- and the relationships between them

Mongoose schema defines the data

- that is actually stored in MongoDB
- so that MongoDB understands
- what data will be requested from it,
- and it knows what data will be returned

# MongoDB Models

Models are

- fancy constructors compiled from Schema definitions
- for creating and reading documents
- from the underlying MongoDB database

When you call mongoose.model()

- on a MongoDB schema (NOT to be confused with the GraphQL schema),
- Mongoose compiles a model for you

# MongoDB Documents

Documents are an

- instance of a model
- e.g. movie see movie.js and directors.js in **models folder**
