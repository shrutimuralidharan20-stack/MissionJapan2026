"use client";
import useWorkoutData from "../hooks/useWorkoutData";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface UserDoc {
  uid: string;
  displayName: string;
  currency: "CAD" | "INR";
  ratePerWorkout: number;
}

export default function Dashboard() {
  const workouts = useWorkoutData();
  const [users, setUsers] = useState<UserDoc[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snaps = await getDocs(collection(db, "users"));
      setUsers(snaps.docs.map((d) => ({ uid: d.id, ...(d.data() as any) })));
    };
    fetchUsers();
  }, []);

  // aggregate workouts
  const totals = users.map((u) => {
    const count = workouts.filter((w) => w.userId === u.uid).length;
    return {
      name: u.displayName,
      count,
      money: count * u.ratePerWorkout,
      label: u.currency === "CAD" ? `$${count * u.ratePerWorkout}` : `₹${count * u.ratePerWorkout}`
    };
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">🏆 Fitness Challenge</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={totals}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(v: any) => v.toString()} />
          <Bar dataKey="money" />
        </BarChart>
      </ResponsiveContainer>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Person</th>
            <th>Workouts</th>
            <th>Money</th>
          </tr>
        </thead>
        <tbody>
          {totals.map((t) => (
            <tr key={t.name} className="border-b last:border-0">
              <td className="py-2">{t.name}</td>
              <td>{t.count}</td>
              <td>{t.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
