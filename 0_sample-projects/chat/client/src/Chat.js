import React from "react";
import useChatMessages from "./hooks";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function Chat({ user }) {
  const { messages, addMessage } = useChatMessages();

  async function handleSend(text) {
    await addMessage(text);
  }

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
