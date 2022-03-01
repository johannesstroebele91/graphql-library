- [1. Basics](#1-basics)
- [2. Application areas](#2-application-areas)
  - [2.1. When not to use](#21-when-not-to-use)
  - [2.2. When to use](#22-when-to-use)
- [3. How it works via WebSockets](#3-how-it-works-via-websockets)
- [4. Understanding via Developer Tools](#4-understanding-via-developer-tools)
- [4.1. sockjs-node:](#41-sockjs-node)
- [4.2. graphl:](#42-graphl)

# 1. Basics

Like queries,

- subscriptions enable to
- fetch data from a server

Unlike queries,

- subscriptions are long-lasting operations
- that can change their result over time

This is because a query is a one-time operation where

- you send one request and
- you receive one response back

In contrast, with a subscription

- you send one request but
- might receive multiple responses

# 2. Application areas

## 2.1. When not to use

Subscriptions can be used for

- notifying your client in real time
- about changes to back-end data,
- such as the creation of a new object
- or updates to an important field

HOWEVER, th following methods should be used

- to stay up to date with your backend
- because they are less costly than subscriptions:
  - periodic polling with queries,
  - re-execute queries on demand (e.g. button click)

## 2.2. When to use

Repeatedly polling for

- small, incremental changes to large objects is expensive
- when most of its fields rarely change
- Instead fetch the object's initial state with a query AND
- AN the server can proactively push updates to individual fields

Low-latency, real-time updates,

- such as chat application's client
- where the user wants to receive new messages
- as soon as they're available

# 3. How it works via WebSockets

Subscriptions can maintain

- an active connection to your GraphQL server
- enabling the server to push updates
- to the subscription's result

Clients need to communicate with the server

- NOT via the http protocal
- but WebSocket

WebSockts make it possible to

- open a two-way interactive communication session
- bweteeen the client and the server

This API enables to

- send messages to a server
- and receive and event-driven response
- (so not a periodic polling required)

# 4. Understanding via Developer Tools

Open developer tools and go to

- Network
- WS

Mostly there are two connections:

# 4.1. sockjs-node:

sockjs-node is a connection to port 3000

- on localhost:3000 runs web development server
- the dev server uses
- WebSockets to automatically reload web page
- if there were changes

# 4.2. graphl:

graphl is a connection to port 9000

- on localhost:9000 runs the backend server
- the subscrition works as follows:

A subscription starts

- with an HTTP get request
- and the server responds with an 101 swiching protocols
- so although WebSockets are a different protocol than HTTP
- the browser initiates the ws connectin with an HTTP request
- via the connection upgrade websocket header

If a connection is established

- all the messages can be seen
- in the messages tab

More details can be seen

- in the section `Inspecting the WebSocket Protocol`
- from the GraphQL by example Udemy course
