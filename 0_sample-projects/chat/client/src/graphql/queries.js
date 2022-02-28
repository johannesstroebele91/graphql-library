import { gql } from "apollo-boost";
import client from "./client";

const messagesQuery = gql`
  query MessagesQuery {
    messages {
      id
      from
      text
    }
  }
`;

const addMessageMutation = gql`
  mutation AddMessageMutation($input: MessageInput!) {
    message: addMessage(input: $input) {
      id
      from
      text
    }
  }
`;

const messageAddSubscription = gql`
  subscription {
    messageAdded {
      id
      from
      text
    }
  }
`;

export async function getMessages() {
  const { data } = await client.query({ query: messagesQuery });
  return data.messages;
}

export async function addMessage(text) {
  const { data } = await client.mutate({
    mutation: addMessageMutation,
    variables: { input: { text } },
  });
  return data.message;
}

export async function onMessageAdded(handleMessage) {
  const observable = client.subscribe({ query: messageAddSubscription });
  return observable.subscribe(({ data }) => handleMessage(data.messageAdded));
}
