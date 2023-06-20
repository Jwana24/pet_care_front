"use client";

import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isTokenValid } from "../../utils";
import { routeWithoutAuthentication } from "@/app/components/constants";

export interface IContext {
  authentication: null | IAuthElement
  setAuthentication: Dispatch<SetStateAction<IAuthElement | null>>
}

export interface IAuthElement {
  accessToken: string | null
  expireAt: string | null
}

interface IProvider {
  children: ReactNode
}

export const AuthContext = React.createContext<null | IContext>(null);

const AuthProvider = ({ children }: IProvider) => {
  const [authentication, setAuthentication] = useState<IAuthElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // useEffect is necessary here because the localStorage is undefined at start
  useEffect(() => {
    const storage = localStorage.getItem("accessToken");

    setAuthentication({
      accessToken: storage && JSON.parse(storage).accessToken,
      expireAt: storage && JSON.parse(storage).expireAt
    });
  }, []);

  useEffect(() => {
    if ((authentication && !isTokenValid(authentication)) && !routeWithoutAuthentication.includes(pathname)) {
      router.push("/login");
    }
  }, [authentication, pathname, router]);

  return (
    <AuthContext.Provider value={{ authentication, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;