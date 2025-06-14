"use client";

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import RemixStudio from '@/components/civicmix/RemixStudio'; // Assuming RemixStudio is in this path
import app from '@/lib/firebase'; // Assuming you have a firebase config file here
import { useAuthState } from 'react-firebase-hooks/auth'; // Assuming you are using react-firebase-hooks for auth
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

const RemixStudioPage = () => {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [draft, setDraft] = useState(null);
  const [schema, setSchema] = useState(null);
  const [templates, setTemplates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const [draftDoc, schemaDoc, templatesDoc] = await Promise.all([
          getDoc(doc(db, `users/${user.uid}/draft`)),
          getDoc(doc(db, "config/remixSchema")),
          getDoc(doc(db, "config/remixTemplates"))
        ]);

        setDraft(draftDoc.exists() ? draftDoc.data() : null);
        setSchema(schemaDoc.exists() ? schemaDoc.data() : null);
        setTemplates(templatesDoc.exists() ? templatesDoc.data() : null);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loadingAuth || loading) {
    return <div className="container mx-auto p-6 bg-gray-50">Loading...</div>;
  }

  if (errorAuth || error) {
    return <div className="container mx-auto p-6 bg-gray-50 text-red-500">Error: {errorAuth?.message || error?.message}</div>;
  }

  if (!user) {
    return <div className="container mx-auto p-6 bg-gray-50">Please log in to access the Remix Studio.</div>;
  }


  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <RemixStudio currentBill={draft?.bill} remixData={draft?.data} schema={schema} templates={templates} />
    </div>
  );
};

export default RemixStudioPage;