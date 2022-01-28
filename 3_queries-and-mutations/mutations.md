# Basics

Allow to

- change (e.g. add, delete, and edit) the data
- in the database
- via an request

# Example

_A response only appears if it is returned in the schema.js (does not have to be, to work)_

Request

```
{
mutation {
  addMovie(name: "Incredibles", genre: "Action", directorId: "61f3c59b6f0c94459de9b023") {
    name
    genre
  }
}
}
```

Reponse

```
{
  "data": {
    "addMovie": {
      "name": "Incredibles",
      "genre": "Action"
    }
  }
}
```
