'use client';

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { HomeIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { authentication } = useContext(AuthContext) as IContext;

  return (
    <div className="flex items-center h-20 bg-main-color">
      <div className="container flex justify-between mx-auto">
        <div className="Logo">
          <Link href='/'>Pet care</Link>
        </div>
        <nav className="flex items-center">
          <Link className="mr-8 flex items-center" href='/'>
            <div className="mr-2"><HomeIcon width={20} /></div>
            Accueil
          </Link>
          {authentication?.accessToken === null ? (
            <>
              <Link className="ml-5" href='/login'>Connexion</Link>
              <Link
                className="ml-5 px-4 py-2 text-white bg-sky-700 hover:bg-sky-900 rounded-r-lg rounded-l-lg"
                href='/signup'
              >
                Inscription
              </Link>
            </>
            ) : (
            <>
              <Link className="flex items-center" href='/account'>
                <div className="mr-2"><Cog6ToothIcon width={20} /></div>
                Mon compte
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Navbar