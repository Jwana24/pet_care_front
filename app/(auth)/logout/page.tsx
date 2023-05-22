'use client';

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";

const Logout = () => {
  const { authentication, setAuthentication } = useContext(AuthContext) as IContext;
  const router = useRouter();

  if (authentication?.accessToken !== null) {
    localStorage.removeItem('accessToken');
    setAuthentication(null);
    router.push('/');
  }
}

export default Logout;