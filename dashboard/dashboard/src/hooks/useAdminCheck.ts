// src/hooks/useAdminCheck.ts
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setIsAdmin(docSnap.exists() && docSnap.data().role === "admin");
      } else {
        setIsAdmin(false);
      }
    };
    check();
  }, []);

  return isAdmin;
};
