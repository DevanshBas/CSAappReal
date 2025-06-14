// src/app/profile/page.js
"use client";

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import UserProfile from '../../components/civicmix/UserProfile'; // Updated path
import app from '../../lib/firebase'; // Updated path
import { useAuthState } from 'react-firebase-hooks/auth'; // Assuming you are using react-firebase-hooks for auth
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

const ProfilePage = () => {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const [remixes, setRemixes] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch profile
        const profileDoc = await getDoc(doc(db, `users/${user.uid}`));
        setProfile(profileDoc.exists() ? profileDoc.data() : null);

        // Fetch remixes
        const remixesQuery = query(collection(db, "remixes"), where("authorId", "==", user.uid));
        const remixesUnsubscribe = onSnapshot(remixesQuery, (snapshot) => {
          const remixesData = [];
          snapshot.forEach((doc) => {
            remixesData.push({ id: doc.id, ...doc.data() });
          });
          setRemixes(remixesData);
        }, (err) => {
          console.error("Error fetching remixes:", err);
          setError(err);
        });

        // Fetch submissions
        const submissionsQuery = query(collection(db, "battles/submissions"), where("userId", "==", user.uid));
        const submissionsUnsubscribe = onSnapshot(submissionsQuery, (snapshot) => {
          const submissionsData = [];
          snapshot.forEach((doc) => {
            submissionsData.push({ id: doc.id, ...doc.data() });
          });
          setSubmissions(submissionsData);
        }, (err) => {
          console.error("Error fetching submissions:", err);
          setError(err);
        });

        setLoading(false);

        return () => {
          remixesUnsubscribe();
          submissionsUnsubscribe();
        };

      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loadingAuth || loading) {
    return <div className="container mx-auto p-6 bg-gray-50">Loading...</div>; // Skeletons
  }

  if (errorAuth || error) {
    return <div className="container mx-auto p-6 bg-gray-50 text-red-500">Error: {errorAuth?.message || error?.message}</div>; // Error banners
  }

  if (!user) {
    return <div className="container mx-auto p-6 bg-gray-50">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <UserProfile profile={profile} remixes={remixes} submissions={submissions} />
    </div>
  );
};

export default ProfilePage;
