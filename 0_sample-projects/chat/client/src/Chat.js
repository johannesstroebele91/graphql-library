import React, { useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);

  async function handleSend(text) {
    const message = { id: text, from: "you", text };
    setMessages(messages.concat(message));
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
