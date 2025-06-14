// src/app/leaderboard/page.js
"use client";

import { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import LeaderHub from '../../components/civicmix/LeaderHub'; // Updated path
import app from '../../lib/firebase'; // Updated path
import { useAuthState } from 'react-firebase-hooks/auth'; // Assuming you are using react-firebase-hooks for auth
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

const LeaderboardPage = () => {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
      setLoading(false);
    }, (err) => {
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loadingAuth || loading) {
    return <div className="container mx-auto p-6 bg-gray-50">Loading...</div>; // Skeleton placeholders
  }

  if (errorAuth || error) {
    return <div className="container mx-auto p-6 bg-gray-50 text-red-500">Error: {errorAuth?.message || error?.message}</div>; // Error fallback
  }

  // You'll need to add logic within LeaderHub to highlight the current user
  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <LeaderHub users={users} currentUser={user} />
    </div>
  );
};

export default LeaderboardPage;
