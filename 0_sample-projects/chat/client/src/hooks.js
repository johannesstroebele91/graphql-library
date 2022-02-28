import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import {
  addMessageMutation,
  messageAddedSubscription,
  messagesQuery,
} from "./graphql/queries";

export default function useChatMessages() {
  const { data } = useQuery(messagesQuery);
  const messages = data ? data.messages : [];

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.writeData({
        data: {
          messages: messages.concat(subscriptionData.data.messageAdded),
        },
      });
    },
  });
  const [addMessage] = useMutation(addMessageMutation);
  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text } } }),
  };
}
