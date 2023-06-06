import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="Homepage">
      <div className="Container">Page d&apos;accueil ici</div>
    </div>
  )
}
