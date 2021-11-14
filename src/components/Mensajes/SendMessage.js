import React, { useState } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import { db, auth } from "../../utils/Api";
import firebase from "firebase";
import "firebase/auth";

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await db.collection("messages").add({
      text: msg,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <Input
            placeholder="Mensaje..."
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Button type="submit">
            <Icon name="angle double right" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;
