import React from 'react';
import Link from "next/link";

import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="flex items-center navbar mb-5">
      <div className="container flex justify-between mx-auto">
        <div className="Logo">
          <Link href='/'>Pet care</Link>
        </div>
        <nav className="flex items-center">
          <Link className="mr-8" href='/login'>Carnet</Link>
          <Link className="ml-5" href='/login'>Connexion</Link>
          <Link
            className="ml-5 px-4 py-2 text-white bg-sky-700 hover:bg-sky-900 rounded-r-lg rounded-l-lg"
            href='/login'
          >
            Inscription
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Navbar