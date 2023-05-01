'use client';

import Image from 'next/image';
import Chat from '../../components/assets/chat.jpg';
import InputField from "@/app/components/ReusableComponents/Fields/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type IFormHealthBook = {
  species: string,
  animalName: string,
  race: string,
  coat: string
  gender: string,
  country: string,
  birthDate: string
};

const validationSchema = yup.object({
  species: yup.string().required("Ce champs est requis"),
  animalName: yup.string().required("Ce champs est requis"),
  race: yup.string().required("Ce champs est requis"),
  coat: yup.string().required("Ce champs est requis")
});

const HealthBook = () => {
  const { handleSubmit, register, formState: { isValid, errors } } = useForm<IFormHealthBook>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  })

  const submitHealthBookInformations = (data: any) => {
    console.log(data);
  }

  const generalFields = [
    { label: "espèce", value: "Chat",     classnames: "mb-5 mr-2" },
    { label: "nom",    value: "Plume",    classnames: "mb-5" },
    { label: "race",   value: "Européen", classnames: "mb-5 mr-2" },
    { label: "pelage", value: "Isabelle", classnames: "mb-5" }
  ];

  const complementaryField = [
    { label: "sexe",              value: "F",          classnames: "mr-2 col-span-3 lg:col-span-1" },
    { label: "provenance",        value: "France",     classnames: "lg:mr-2 col-span-3 lg:col-span-2" },
    { label: "date de naissance", value: "01/08/2004", classnames: "col-span-6 lg:col-span-3" }
  ]

  const identificationField = [
    { label: "type d'identification",   value: "puce",       classnames: "mr-2 col-span-2 lg:col-span-1" },
    { label: "date d'identification",   value: "02/12/2004", classnames: "lg:mr-2 col-span-2 lg:col-span-1" },
    { label: "lieu d'identification",   value: "Cabinet Vétérinaire Des Trois Valets - 31 avenue Gambetta 24400 MUSSIDAN", classnames: "col-span-4 lg:col-span-2" },
    { label: "numéro d'identification", value: "0101010101", classnames: "col-span-2 lg:col-span-1" }
  ]

  return (
    <div className="w-full m-8 block max-w bg-white border border-gray-200 rounded-lg shadow">
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
          <div className="grid grid-cols-2 lg:grid-cols-1">
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