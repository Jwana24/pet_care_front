import React from 'react';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="bottom-0 w-full flex flex-col items-center pt-5 bg-main-color">
        <div className="flex flex-col items-center pb-8">
          <div className="Logo">
            <Link href='/'>Pet care</Link>
          </div>
        </div>
        <p className="pb-1.5">© Site réalisé par Johanna DETRIEUX et Théo FRISON</p>
      </div>
    </footer>
  )
}

export default Footer