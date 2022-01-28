const { GraphQLInt } = require("graphql");
const graphql = require("graphql");
const _ = require("lodash");
const Movie = require("../models/movie");
const Director = require("../models/director");

// Import different objects from GraphQL package
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
} = graphql;

// Creates a new object type
// The field name is the name of the object type
// Fields are the different fields of the object type
// PS the order is important
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    // Needs to be a function, because then JS waits until everything else the whole file is run. Before the type (e.g. DirectorType) cannot be accessed before initalization
    id: { type: GraphQLID }, // ID enables to pass not "1", but just 1 (= more flexible)
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // Relationship between types can be defined as follows
    // a type can be reused
    // and the parent parameter be used to find the director
    // via the directorID of the parent (here movie)
    director: {
      type: DirectorType, // is enough if there is just one director per movie (if more, GraphQLList is needed)
      resolve(parent, args) {
        console.log(parent);
        // return _.find(directors, { id: parent.directorId });
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID }, // ID enables to pass not "1", but just 1 (= more flexible)
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType), // list of movie types
      resolve(parent, args) {
        // return _.filter(movies, { id: parent.id }); // filter through array, for each movie that has the specified id
      },
    },
  }),
});

// Root queries need to be defined in the schema
// Movie query needs to specify the argument id to work
// The actually database requests needs to be defined via resolve()
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    movie: {
      // defines the name of the query
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(typeof args.id); // returns a string, because GraphQLID is in the end a string

        // this function acutally gets data from database
        // return _.find(movies, { id: args.id });
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(directors, { id: args.id });
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
      },
    },
  }),
});

// Exports the schema,
// which includes the query
// and the respective object types
module.exports = new GraphQLSchema({
  query: RootQuery,
});
