# # 1. Backend

## 1.1. Schema

For the subscriptions

- in type Subscription
- use a name that describes an event!!!

```graphql
type Subscription {
  messageAdded: Message
}

type Message {
  id: ID!
  from: String
  text: String
}

input MessageInput {
  text: String
}
```

## 1.2. Resolvers

```javascript

```

# 2. Frontend

## 2.1. requests.js

```javascript

```

## 2.2. React component

```javascript

```
