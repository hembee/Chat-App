import "./App.css";

import { useState } from "react";
import Chats from "./components/Chats";
const io = require("socket.io-client");

const socket = io("https://hembee.github.io/Chat-App", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "Chat App",
  },
});

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showChat, setShowChat] = useState(false);

  const submitHandler = () => {
    if (username !== "" && password !== "") {
      socket.emit("join_room", password);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Wunmi ❤"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button onClick={submitHandler}>Join A Room</button>
        </div>
      ) : (
        <Chats socket={socket} username={username} password={password} />
      )}
    </div>
  );
}

export default App;
