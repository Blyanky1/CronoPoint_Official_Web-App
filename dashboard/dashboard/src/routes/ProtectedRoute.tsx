import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react"; // ✅ type-only import
import { auth, db } from "../firebase/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setIsAdmin(data.role === "admin");
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  if (isAdmin === null) return <div>Carregando...</div>;
  if (!isAdmin) return <Navigate to="/" />;

  return <>{children}</>;
};
