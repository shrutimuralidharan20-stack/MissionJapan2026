"use client";
import { auth, db } from "../lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LogWorkoutButton() {
  const router = useRouter();
  const logWorkout = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await addDoc(collection(db, "workouts"), {
      userId: user.uid,
      date: serverTimestamp()
    });
    router.refresh();
  };

  return (
    <button
      onClick={logWorkout}
      className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-2xl hover:scale-105 transition-transform"
    >
      ✅ Log workout
    </button>
  );
}
