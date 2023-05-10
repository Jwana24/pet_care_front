"use client";

import React, { ReactNode, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/app/components/Private/AuthProvider";

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
  const authContext = useContext(AuthContext);

  if (authContext?.authentication !== null && user === null) {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${authContext?.authentication}` }
    })
      .then((response) => setUser(response.data))
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;