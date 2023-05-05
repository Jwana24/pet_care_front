'use client';

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/components/Private/AuthProvider";

const Logout = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (authContext?.authentication !== null) {
    localStorage.removeItem('accessToken');
    authContext?.setAuthentication(null);
    router.push('/');
  }
}

export default Logout;