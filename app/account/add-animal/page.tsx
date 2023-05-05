'use client';

import Chat from '../../components/assets/chat.jpg';
import InputField from "@/app/components/ReusableComponents/Fields/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeatlhBookForm from "@/app/components/ReusableComponents/Form/HeatlhBookForm";
import SelectField from "@/app/components/ReusableComponents/Fields/SelectField";

type IFormHealthBook = {
  species: string,
  animalName: string,
  race: string,
  coat: string
  gender: string,
  country: string,
  birthDate: Date,
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
  const { handleSubmit, register, formState: { errors } } = useForm<IFormHealthBook>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  })

  const submitHealthBookInformations = (data: any) => {
    console.log(data);
  }

  const generalFields = [
    {
      component: <InputField type="text" label="espèce" name="species" register={register} errors={errors.species?.message} />,
      classnames: "col-span-6 mb-5 mr-2"
    },
    {
      component: <InputField type="text" label="nom" name="animalName" register={register} errors={errors.animalName?.message} />,
      classnames: "col-span-6 mb-5"
    },
    {
      component: <InputField type="text" label="race" name="race" register={register} errors={errors.race?.message} />,
      classnames: "col-span-6 mb-5 mr-2"
    },
    {
      component: <InputField type="text" label="pelage" name="coat" register={register} errors={errors.coat?.message} />,
      classnames: "col-span-6 mb-5"
    },
    {
      component: <SelectField
        label="sexe"
        name="gender"
        register={register}
        options={[{ value: "female", optionName: "F" }, { value: "male", optionName: "M" }]}
        errors={errors.gender?.message}
      />,
      classnames: "mr-2 col-span-4 lg:col-span-2"
    },
    {
      component: <InputField type="text" label="provenance" name="country" register={register} errors={errors.country?.message} />,
      classnames: "mr-2 col-span-4 lg:col-span-5"
    },
    {
      component: <InputField type="date" label="date de naissance" name="birthDate" register={register} errors={errors.birthDate?.message} />,
      classnames: "col-span-4 lg:col-span-5"
    },
    {
      component: <InputField type="text" label="type d'identification" name="idType" register={register} errors={errors.idType?.message} />,
      classnames: "mr-2 col-span-6"
    },
    {
      component: <InputField type="date" label="date d'identification" name="idDate" register={register} errors={errors.idDate?.message} />,
      classnames: "col-span-6"
    },
    {
      component: <InputField type="text" label="lieu d'identification" name="idPlace" register={register} errors={errors.idPlace?.message} />,
      classnames: "col-span-12"
    },
    {
      component: <InputField type="text" label="numéro d'identification" name="idNumber" register={register} errors={errors.idNumber?.message} />,
      classnames: "mr-2 col-span-6"
    },
  ];

  return (
    <HeatlhBookForm
      titlePage="Ajouter un animal"
      imgSrc={Chat}
      handleSubmit={handleSubmit(submitHealthBookInformations)}
      fields={generalFields}
    />
  )
}

export default AddAnimal;