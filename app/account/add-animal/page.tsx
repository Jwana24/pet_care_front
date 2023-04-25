'use client';

import Image from 'next/image';
import Chat from '../../components/assets/chat.jpg';
import InputField from "@/app/components/ReusableComponents/Form/InputField";
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
  birthDate: string,
  idType: string,
  idDate: Date,
  idPlace: string,
  idNumber: number
};

const validationSchema = yup.object({
  species: yup.string().required("Ce champs est requis"),
  animalName: yup.string().required("Ce champs est requis"),
  race: yup.string().required("Ce champs est requis"),
  coat: yup.string().required("Ce champs est requis"),
  gender: yup.string().required("Ce champs est requis"),
  country: yup.string().required("Ce champs est requis"),
  birthDate: yup.date().required("Ce champs est requis"),
  idType: yup.string().required("Ce champs est requis"),
  idDate: yup.date().required("Ce champs est requis"),
  idPlace: yup.string().required("Ce champs est requis"),
  idNumber: yup.number().required("Ce champs est requis")
});

const AddAnimal = () => {
  const { handleSubmit, register, formState: { isValid, errors } } = useForm<IFormHealthBook>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  })

  const submitHealthBookInformations = (data: any) => {
    console.log(data);
  }

  const generalFields = [
    {
      options : {
        type:"text", label: "espèce", name: "species", inline: true, labelSize: 20, register: register, errors: errors.species?.message
      },
      component: InputField,
      classnames: "mb-5 mr-2 lg:mr-0"
    },
    {
      options : {
        type:"text", label: "nom", name: "animalName", inline: true, labelSize: 20, register: register, errors: errors.animalName?.message
      },
      component: InputField,
      classnames: "mb-5"
    },
    {
      options : {
        type:"text", label: "race", name: "race", inline: true, labelSize: 20, register: register, errors: errors.race?.message
      },
      component: InputField,
      classnames: "mb-5 mr-2 lg:mr-0"
    },
    {
      options : {
        type:"text", label: "pelage", name: "coat", inline: true, labelSize: 20, register: register, errors: errors.coat?.message
      },
      component: InputField,
      classnames: "mb-5"
    }
  ];

  const complementaryField = [
    {
      options : {
        type:"text", label: "sexe", name: "gender", labelSize: 20, register: register, errors: errors.gender?.message
      },
      component: InputField,
      classnames: "mr-2 col-span-3 lg:col-span-1"
    },
    {
      options : {
        type:"text", label: "provenance", name: "country", labelSize: 28, register: register, errors: errors.country?.message
      },
      component: InputField,
      classnames: "lg:mr-2 col-span-3 lg:col-span-2"
    },
    {
      options : {
        type:"text", label: "date de naissance", name: "birthDate", labelSize: 32, register: register, errors: errors.birthDate?.message
      },
      component: InputField,
      classnames: "col-span-6 lg:col-span-3"
    },
  ]

  const identificationField = [
    {
      options : {
        type:"text", label: "type d'identification", name: "idType", labelSize: 20, register: register, errors: errors.idType?.message
      },
      component: InputField,
      classnames: "mr-2 col-span-2 lg:col-span-1"
    },
    {
      options : {
        type:"date", label: "date d'identification", name: "idDate", labelSize: 28, register: register, errors: errors.idDate?.message
      },
      component: InputField,
      classnames: "lg:mr-2 col-span-2 lg:col-span-1"
    },
    {
      options : {
        type:"text", label: "lieu d'identification", name: "idPlace", labelSize: 32, register: register, errors: errors.idPlace?.message
      },
      component: InputField,
      classnames: "col-span-4 lg:col-span-2"
    },
    {
      options : {
        type:"text", label: "numéro d'identification", name: "idNumber", labelSize: 32, register: register, errors: errors.idNumber?.message
      },
      component: InputField,
      classnames: "col-span-2 lg:col-span-1"
    },
  ]

  return (
    <div className="h-full w-full m-8 block max-w bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800
      dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div className="flex justify-center items-center h-14 bg-dark-main-color rounded-tl-lg rounded-tr-lg text-3xl text-white uppercase tracking-widest">
        Ajouter un animal
      </div>
      <form onSubmit={handleSubmit(submitHealthBookInformations)} className="p-5">
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12">
          <div className="min-w-[16rem] col-span-12 lg:col-span-4 lg:row-span-5 h-80 mb-5 lg:mb-0 lg:mr-5">
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
                  <field.component {...field.options} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-6">
              {complementaryField.map((field, index) => (
                <div key={index} className={`mb-5 ${field.classnames}`}>
                  <field.component {...field.options} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 col-span-12">
            <div className="grid grid-cols-4">
              {identificationField.map((field, index) => (
                <div key={index} className={`mb-5 ${field.classnames}`}>
                  <field.component {...field.options} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddAnimal;