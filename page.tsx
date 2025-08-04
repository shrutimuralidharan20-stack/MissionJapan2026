"use client";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  if (!user) {
    const login = async () => {
      await signInWithEmailAndPassword(auth, email, password);
    };

    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-64"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-64"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Log in
        </button>
      </div>
    );
  }

  return <Dashboard />;
}
