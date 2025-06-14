"use client";

import { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import BillExplorer from '@/components/civicmix/BillExplorer'; // Assuming BillExplorer is in this path
import app from '@/lib/firebase'; // Assuming you have a firebase config file here

const db = getFirestore(app);

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "bills"), orderBy("introducedDate", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const billsData = [];
      snapshot.forEach((doc) => {
        billsData.push({ id: doc.id, ...doc.data() });
      });
      setBills(billsData);
      setLoading(false);
    }, (err) => {
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="bg-gray-50 min-h-screen p-6">Loading...</div>; // Full-page skeleton loader
  }

  if (error) {
    return <div className="bg-gray-50 min-h-screen p-6 text-red-500">Error: {error.message}</div>; // Error banner
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <BillExplorer bills={bills} />
    </div>
  );
};

export default BillsPage;