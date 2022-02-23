# Basics

_The following frontend technologies can enhance GraphQL and make working with it easer_

- [Basics](#basics)
- [1. Vanilla JS](#1-vanilla-js)
- [2. Apollo Client](#2-apollo-client)
- [3. React](#3-react)

GraphQL is

- not meant to be directly INTERACTED with from the client
- in order to make HTTP requests to the GraphQL server
- BUT enables to use many different technologies to make them

# 1. Vanilla JS

Vanilla JS provide several solutions

- such as fetch() function, axios, or jQUery
- to make request for retrieving data
- from an GraphQL endpoint

# 2. Apollo Client

Apollo client enables tto

- fetch, cache, and modify application data,
- all while automatically updating your UI

So it

- it makes it easier to write queries and mutations (e.g. useQuery and useMutation) AND
- enables caching
  - which avoids making unecessary same requests and
  - uses data that was retrieved earlier
  - PS the cache is dependend on the "id" of the request
  - PS the cache can be persiteted to local storage

Apollo Client is a

- comprehensive state management library for JavaScript
- that enables you to manage both
- local and remote data with GraphQL

# 3. React

React is a

- front-end JavaScript library
- for building user interfaces
- based on UI components
- to develop single-page or mobile applications

It can be used to write requests

- with the fetch() function of Vanilla JS
- or request hooks from Apollo Client
