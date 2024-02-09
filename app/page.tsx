import Link from "next/link";
import ImgHomepage from "../app/components/assets/homepage.jpg";
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className="Homepage">
      <div className="Container">
        <div className={styles.ImageContainer} style={{ backgroundImage: `url(${ImgHomepage.src})` }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.waves}>
            <path fill="#fff" fill-opacity="1" d="M0,160L48,160C96,160,192,160,288,170.7C384,181,480,203,576,202.7C672,203,768,181,864,144C960,
            107,1056,53,1152,48C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,
            672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
          <div className="z-10 -mt-24 relative">
            <p className="text-4xl text-center mb-3 font-stylish">Parce que la santé de nos animaux est importante,</p>
            <p className="text-4xl text-center mb-3 font-stylish">il est de notre devoir d'y veiller</p>
            <p className="text-2xl text-center pt-4">
              C'est pourquoi il vous est possible ici de gérer le <mark className="bg-main-color">carnet de
              santé</mark> de vos animaux
            </p>
            <p className="text-2xl text-center pb-14">en créant ou en vous connectant à votre compte.</p>
            <div className="flex items-center justify-center pb-14">
              <Link
                className="ml-5 px-4 py-2 text-2xl text-white bg-sky-700 hover:bg-sky-900 rounded-r-lg rounded-l-lg"
                href='/signup'
              >
                Inscription
              </Link>
              <Link className="text-2xl ml-5 underline" href='/login'>Connexion</Link>
            </div>
          </div>
      </div>
    </div>
  )
}
