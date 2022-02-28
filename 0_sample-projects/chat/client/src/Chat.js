import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { addMessageMutation, messagesQuery } from "./graphql/queries";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function Chat({ user }) {
  const { loading, error, data } = useQuery(messagesQuery);
  const [addMessage] = useMutation(addMessageMutation);
  const messages = data ? data.messages : [];

  async function handleSend(text) {
    await addMessage({ variables: { input: text } });
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
