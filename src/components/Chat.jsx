import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!msg.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: msg.trim(),
      uid: auth.currentUser.uid,
      createdAt: new Date()
    });
    setMsg("");
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>

      {messages.map((m, i) => (
        <p key={i}>
          {m.uid === auth.currentUser.uid ? "You: " : "Other: "}
          {m.text}
        </p>
      ))}

      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
    </div>
  );
}