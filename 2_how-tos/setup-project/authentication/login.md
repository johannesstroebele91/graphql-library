# Basics

It is important to

- hide the GraphQL API from the outside
- to probibit unautorized users
- from adding jobs without login

# How Login Works

Users are autorized

- by login into the app
- with the "valid" credentials

This is done by during the login process by

- extracting the email and password from the login request
- checking if these credentials are stored in the database

This can lead to two scenarios:

1. reject with a 401 Unauthorized and throws an error
2. accept with an 200 OK and sends back an access token generated with JWT

The decoded JWT payload is

- available on the request via the user property.
- so it can be checked on the user property of the request (req.user)
- if the user is authenticated
