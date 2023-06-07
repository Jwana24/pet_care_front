import Image from "next/image";
import DefaultImage from "@/app/components/assets/default_image.png";
import { IPet } from "@/app/account/health-books-list/page";
import { EyeIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface IAnimalCard {
  pet: IPet
}

const AnimalCard = ({ pet }: IAnimalCard) => {
  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  const animalGender = pet.gender === "female" ? "♀️" : "♂️"

  return (
    <div className="flex w-full h-44 max-w bg-white border border-gray-200 rounded-lg shadow">
      <div>
        <Image
          src={pet.picture ? pet.picture : DefaultImage}
          alt="Picture of the animal"
          width={200}
          height={180}
          className="w-full h-full object-top object-cover rounded-l-lg"
        />
      </div>
      <div className="flex flex-col justify-center w-5/6 pl-7">
        <h2 className="text-xl font-bold">{`${pet?.name} ${animalGender}`}</h2>
        <p>{`${pet?.specie} `}<span className="italic">&quot;{pet?.breed}&quot;</span></p>
        <p>{pet?.coat}</p>
        <p>{truncateString(pet?.description, 250)}</p>
      </div>
      <div className="flex justify-end items-start w-1/6 h-full mt-2">
        <div className="w-10 h-10 aspect-square rounded-full bg-slate-100 hover:bg-slate-300 text-slate-600 cursor-pointer p-2 mr-2 transition-colors duration-150">
          <PencilSquareIcon />
        </div>
        <div className="w-10 h-10 aspect-square rounded-full bg-slate-100 hover:bg-slate-300 text-slate-600 cursor-pointer p-2 mr-2 transition-colors duration-150">
          <EyeIcon />
        </div>
      </div>
    </div>
  )
}

export default AnimalCard;