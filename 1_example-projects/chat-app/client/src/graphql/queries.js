import { gql } from "apollo-boost";

export const messagesQuery = gql`
  query MessagesQuery {
    messages {
      id
      from
      text
    }
  }
`;

export const addMessageMutation = gql`
  mutation AddMessageMutation($input: MessageInput!) {
    message: addMessage(input: $input) {
      id
      from
      text
    }
  }
`;

export const messageAddedSubscription = gql`
  subscription {
    messageAdded {
      id
      from
      text
    }
  }
`;

/* All these functions are no longer used due to apollo hooks and are just here as a reference
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
  const observable = client.subscribe({ query: messageAddedSubscription });
  return observable.subscribe(({ data }) => handleMessage(data.messageAdded));
}
*/
