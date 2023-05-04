"use client";

import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface IContext {
  authentication: null | string
  setAuthentication: Dispatch<SetStateAction<string | null>>
}

interface IProvider {
  children: ReactNode
}

export const AuthContext = React.createContext<null | IContext>(null);

const AuthProvider = ({ children }: IProvider) => {
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