import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.scss';
import Header from "@/app/components/Navbar/Navbar";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="Homepage">
      <div className="Container">Page d&apos;accueil ici</div>
    </div>
  )
}
