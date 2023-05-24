"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { isDefined, requestGet } from "@/app/components/utils";

export interface IUser {
  email: string
  createdAt: Date
  updatedAt: Date
  petOwner: IPetOwner
}

export interface IPetOwner {
  id: string,
  gender: string
  firstName: string
  lastName: string
  address: string
  zipCode: string
  city: string
  country: string
  phone: string
}

interface IUserProvider {
  children: ReactNode
}

export interface IUserContext {
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const UserContext = React.createContext<null | IUserContext>(null);

const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { authentication } = useContext(AuthContext) as IContext;

  useEffect(() => {
    if (isDefined(authentication?.accessToken) && !isDefined(user)) {
      requestGet('auth/me', authentication?.accessToken)
        .then((response) => setUser(response.data))
    }
  }, [ authentication?.accessToken, user ]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;