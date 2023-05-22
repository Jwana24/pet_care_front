"use client";

import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface IContext {
  authentication: null | IAuthElement
  setAuthentication: Dispatch<SetStateAction<IAuthElement | null>>
}

interface IAuthElement {
  accessToken: string | null
  expireAt: Date | null
}

interface IProvider {
  children: ReactNode
}

export const AuthContext = React.createContext<null | IContext>(null);

const AuthProvider = ({ children }: IProvider) => {
  const [authentication, setAuthentication] = useState<IAuthElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const newDateTimestamp = (Date.now() / 1000).toString();

  // useEffect is necessary here because the localStorage is undefined at start
  useEffect(() => {
    const storage = localStorage.getItem("accessToken");
    setAuthentication({
      accessToken: storage && JSON.parse(storage).accessToken,
      expireAt: storage && JSON.parse(storage).expireAt
    });
  }, []);

  if (authentication?.accessToken !== null || ['/', '/login'].includes(pathname)) { // + add check date validité
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