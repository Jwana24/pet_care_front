"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(localStorage.getItem('accessToken'));
  const router = useRouter();
  const pathname = usePathname();

  if (authentication !== null || ['/', '/login'].includes(pathname)) { // + add check date validité
    return (
      <AuthContext.Provider value={{ authentication, setAuthentication }}>
        {children}
      </AuthContext.Provider>
    )
  } else {
    router.push("/login");
    return null;
  }
}

export default AuthProvider;