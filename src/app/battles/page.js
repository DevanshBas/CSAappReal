// src/app/battles/page.js
"use client";

import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import BracketArena from '../../components/civicmix/BracketArena'; // Updated path
import app from '../../lib/firebase'; // Updated path
import { useParams } from 'next/navigation';

const db = getFirestore(app);

const BattlesPage = () => {
  const [battles, setBattles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const tab = params.tab; // Get the tab parameter from the URL

  useEffect(() => {
    let q;
    if (tab) {
      q = query(collection(db, "battles"), where("status", "==", tab));
    } else {
      q = query(collection(db, "battles"), where("status", "==", "active")); // Default to active if no tab
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const battlesData = [];
      snapshot.forEach((doc) => {
        battlesData.push({ id: doc.id, ...doc.data() });
      });
      setBattles(battlesData);
      setLoading(false);
    }, (err) => {
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [tab]);

  if (loading) {
    return <div className="bg-gray-50 min-h-screen p-6">Loading...</div>; // Skeleton placeholders
  }

  if (error) {
    return <div className="bg-gray-50 min-h-screen p-6 text-red-500">Error: {error.message}</div>; // Error fallback
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <BracketArena battles={battles} />
    </div>
  );
};

export default BattlesPage;
