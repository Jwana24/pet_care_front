import React from 'react';
import Link from "next/link";
import { HomeIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import './Navbar.scss';

const Navbar = () => {
  const isConnected: boolean = true;

  return (
    <div className="flex items-center navbar">
      <div className="container flex justify-between mx-auto">
        <div className="Logo">
          <Link href='/'>Pet care</Link>
        </div>
        <nav className="flex items-center">
          <Link className="mr-8 flex items-center" href='/'>
            <div className="w-5 mr-2"><HomeIcon /></div>
            Accueil
          </Link>
          {!isConnected ? (
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
                <div className="w-5 mr-2"><Cog6ToothIcon /></div>
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