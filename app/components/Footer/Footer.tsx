import React from 'react';
import Link from "next/link";

import './Footer.scss';

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center footer pt-5">
      <div className="flex flex-col items-center pb-8">
        <div className="Logo">
          <Link href='/'>Pet care</Link>
        </div>
        <footer className="GeneralLink">
          <Link className="mr-5 " href='/signup'>Inscription</Link>
          <Link className="mr-5" href='/login'>Connexion</Link>
          <Link href='/login'>Carnet</Link>
        </footer>
      </div>
      <p className="pb-1.5">© Site réalisé par Johanna DETRIEUX et Théo FRISON</p>
    </div>
  )
}

export default Footer