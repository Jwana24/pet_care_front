import { useEffect, useState } from "react";
import Link from "next/link";
import { IPet } from "@/app/components/types";
import Image from "next/image";
import DefaultImage from "@/app/components/assets/default_image.png";
import { EyeIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface IAnimalCard {
  pet: IPet
}

const AnimalCard = ({ pet }: IAnimalCard) => {
  const [ width, setWidth ] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isSmallDevice = width <= 1500;
  const isMobile = width <= 768;

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  const animalGender = pet.gender === "female" ? "♀️" : "♂️";

  return (
    <div className={`flex w-full max-w bg-white border border-gray-200 rounded-lg shadow ${isMobile ? "flex-col h-min" : "flex-row h-44"}`}>
      <div>
        <Image
          src={pet.picture ? pet.picture : DefaultImage}
          alt="Picture of the animal"
          width={isMobile ? 446 : 200}
          height={isMobile ? 150 : 180}
          className={`object-top object-cover ${isMobile ? "h-48 rounded-t-lg" : "w-full h-full rounded-l-lg"}`}
        />
      </div>
      <div className={`flex flex-col justify-center ${isMobile ? "p-5" : "w-5/6 pl-7"}`}>
        <h2 className="text-xl font-bold">{`${pet?.name} ${animalGender}`}</h2>
        <p>{`${pet?.specie} `}<span className="italic">&quot;{pet?.breed}&quot;</span></p>
        <p>{pet?.coat}</p>
        {!isSmallDevice && pet.description && <p>{truncateString(pet.description, 250)}</p>}
      </div>
      <div className={`flex justify-end items-start h-full ${isMobile ? "p-2" : "mt-2"}`}>
        <div className="w-10 h-10 aspect-square rounded-full bg-slate-100 hover:bg-slate-300 text-slate-600 cursor-pointer p-2 mr-2 transition-colors duration-150">
          <Link href={`/account/edit-animal/${pet.id}`}>
            <PencilSquareIcon />
          </Link>
        </div>
        <div className={`w-10 h-10 aspect-square rounded-full bg-slate-100 hover:bg-slate-300 text-slate-600 cursor-pointer transition-colors duration-150
          p-2 ${!isMobile && "mr-2"}`}>
          <Link href={`/account/health-book/${pet.id}`}>
            <EyeIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AnimalCard;