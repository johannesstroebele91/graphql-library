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
