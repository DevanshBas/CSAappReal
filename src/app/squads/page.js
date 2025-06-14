// src/app/squads/page.js
"use client";

import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import SquadsPage from '@/components/civicmix/SquadsPage'; // Assuming SquadsPage is in this path
import app from '@/lib/firebase'; // Assuming you have a firebase config file here

const db = getFirestore(app);

const SquadsIndexPage = () => {
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = collection(db, "squads");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const squadsData = [];
      snapshot.forEach((doc) => {
        squadsData.push({ id: doc.id, ...doc.data() });
      });
      setSquads(squadsData);
      setLoading(false);
    }, (err) => {
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="bg-gray-50 p-6">Loading...</div>; // Loader state
  }

  if (error) {
    return <div className="bg-gray-50 p-6 text-red-500">Error: {error.message}</div>; // Error state
  }

  return (
    <div className="bg-gray-50 p-6">
      <SquadsPage squads={squads} />
    </div>
  );
};

export default SquadsIndexPage;
