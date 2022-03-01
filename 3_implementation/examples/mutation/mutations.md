# Basics

Enable to modify (add, delete, and edit)

- server-side data
- and by default return nothing if not specified
- however it is recommended to return the created data

# Tipps

- Return type NEEDS to be always specified!!!
  `mutation { createJob(..) {companyId } }`
- By default the response name would be "createJob",
  - use alias like job to fix this
  - `mutation { job:createJob(companyId: "SJVO-wdOM", ...) {title ... } }`
- Properties can be made not skipable
  - by adding add to args property e.g. in schema.js ()
  - `name: { type: new GraphQLNonNull(GraphQLString) }`
- A response only appears
  - if it is returned in the schema.js
  - PS does not have to be provided, to work

# Types

1. Mutating with dynamic arguments
   1. For a few arguments (output type) `mutation-few-dynamic-args.md`
   2. For many arguments (input type) `mutation-many-dynamic-args.md`
2. Mutating with static arguments (e.g. `mutation { job: createJob( companyId: "SJVO-wdOM" title: "Test" description: "Test" ) { title } }`)
