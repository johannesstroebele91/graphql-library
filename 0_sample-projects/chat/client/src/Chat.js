import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import React from "react";
import {
  addMessageMutation,
  messageAddedSubscription,
  messagesQuery,
} from "./graphql/queries";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function Chat({ user }) {
  const { data, loading, error } = useQuery(messagesQuery);
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

  async function handleSend(text) {
    await addMessage({ variables: { input: { text } } });
  }

  if (loading) return <p>Data is loading... </p>;
  if (error) return <p>Error!</p>;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}
