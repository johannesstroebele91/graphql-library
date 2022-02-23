# Basics

Apollo Client is a

- comprehensive state management library for JavaScript
- that enables you to manage both
- local and remote data with GraphQL

Apollo client enables tto

- fetch, cache, and modify application data,
- all while automatically updating your UI

Write queries and mutations is easier due to

- apollo client providing hooks
- e.g. useQuery and useMutation

Further it provides caching

- which avoids making unecessary same requests and
- uses data that was retrieved earlier
- PS the cache is dependend on the "id" of the request
- PS the cache can be persiteted to local storage

# Solution without Apollo Client

The following methods can be used to also make requests

- fetch() function from Vanilla JS
- axios, or
- jQUery

Example of this can be seen in earlier commits of this project `0_sample-projects\job-board`
