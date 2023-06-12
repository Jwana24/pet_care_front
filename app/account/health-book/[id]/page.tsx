'use client';

import { useContext, useEffect, useState } from "react";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { requestGet } from "@/app/components/utils";
import { IPet } from "@/app/components/types";
import Image from 'next/image';
import Chat from '../../../components/assets/chat.jpg';

const HealthBook = ({ params }: { params: { id: number } }) => {
  const { authentication } = useContext(AuthContext) as IContext;
  const idPet = params.id;
  const [ petInfo, setPetInfo ] = useState<IPet|null>(null);

  useEffect(() => {
    if (authentication?.accessToken) {
      requestGet<IPet>(`pets/${idPet}`, authentication?.accessToken)
        .then((response) => {
          const birthDate = new Date(response?.data?.birthDate);
          const deceaseDate = new Date(response?.data?.deceaseDate);
          const identificationDate = new Date(response?.data?.identificationDate);
          setPetInfo({ ...response?.data, birthDate: birthDate, deceaseDate: deceaseDate, identificationDate: identificationDate })
        })
    }
  }, [ authentication?.accessToken, idPet ]);

  console.log(petInfo)

  const generalFields = [
    { label: "espèce", value: petInfo?.specie, classnames: "mb-5 mr-2" },
    { label: "nom",    value: petInfo?.name,   classnames: "mb-5" },
    { label: "race",   value: petInfo?.breed,  classnames: "mb-5 mr-2" },
    { label: "pelage", value: petInfo?.coat,   classnames: "mb-5" }
  ];

  const complementaryField = [
    { label: "sexe",              value: petInfo?.gender,       classnames: "mr-2 col-span-3 lg:col-span-1" },
    { label: "provenance",        value: petInfo?.birthCountry, classnames: "lg:mr-2 col-span-3 lg:col-span-2" },
    { label: "date de naissance", value: petInfo?.birthDate?.toDateString(),    classnames: "col-span-6 lg:col-span-3" }
  ]

  const identificationField = [
    { label: "type d'identification",   value: petInfo?.identificationType,   classnames: "mr-2 col-span-2 lg:col-span-1" },
    { label: "date d'identification",   value: petInfo?.identificationDate?.toDateString(),   classnames: "lg:mr-2 col-span-2 lg:col-span-1" },
    { label: "lieu d'identification",   value: petInfo?.identificationPlace,  classnames: "col-span-4 lg:col-span-2" },
    { label: "numéro d'identification", value: petInfo?.identificationNumber, classnames: "col-span-2 lg:col-span-1" }
  ]

  return (
    <div className="w-full h-min m-8 block max-w bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex justify-center items-center h-14 bg-dark-main-color rounded-tl-lg rounded-tr-lg text-3xl
        text-white uppercase tracking-widest"
      >
        Carnet de santé
      </div>
      <div className="p-5 mt-5 grid grid-cols-1 lg:grid-cols-12">
        <div className="min-w-[16rem] h-80 col-span-12 lg:col-span-4 mb-5 lg:mb-0 lg:mr-5">
          <Image
            src={Chat}
            alt="Picture of the animal"
            width={200}
            height={180}
            className="w-full h-full object-top object-cover rounded"
          />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-2">
            {generalFields.map((field, index) => (
              <div key={index} className={field.classnames}>
                <p className="text-gray-500 italic">{field.label}</p>
                <p>{field.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6">
            {complementaryField.map((field, index) => (
              <div key={index} className={`mb-5 ${field.classnames}`}>
                <p className="text-gray-500 italic">{field.label}</p>
                <p>{field.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 col-span-12">
            <div className="grid grid-cols-4">
              {identificationField.map((field, index) => (
                <div key={index} className={`mb-5 ${field.classnames}`}>
                  <p className="text-gray-500 italic">{field.label}</p>
                  <p>{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthBook;