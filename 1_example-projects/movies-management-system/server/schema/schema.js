const { GraphQLInt } = require("graphql");
const graphql = require("graphql");
const _ = require("lodash");
const MovieModel = require("../models/movie");
const DirectorModel = require("../models/director");

// Import different objects from GraphQL package
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
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
        // return _.find(directors, { id: parent.directorId });
        return DirectorModel.findById(parent.directorId); // finds ONE director based on the movie, `therefore just string`
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
        return MovieModel.find({ directorId: parent.id }); // finds ALL movies based on the respective director, `therefore object`
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
        // this function acutally gets data from database
        // return _.find(movies, { id: args.id });
        return MovieModel.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(directors, { id: args.id });
        return DirectorModel.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return MovieModel.find({}); // if no criteria specified, all movies are returned
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return DirectorModel.find({});
      },
    },
  }),
});

// Mutations allow to add, delete, or edit e.g. a movie
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let movie = new MovieModel({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return movie.save();
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let director = new DirectorModel({
          // Enables to create a director based on the provided args with the Director Model
          // @ts-ignore
          name: args.name,
          age: args.age,
        });
        return director.save(); // Enables to save the instance of the director model, so a mongodb document, to the database
      },
    },
  },
});

// Exports the schema,
// which includes the query
// and the respective object types
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
