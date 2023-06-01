'use client';

import Chat from '../../components/assets/chat.jpg';
import InputField from "@/app/components/ReusableComponents/Fields/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeatlhBookForm from "@/app/components/ReusableComponents/Form/HeatlhBookForm";
import SelectField from "@/app/components/ReusableComponents/Fields/SelectField";
import TextareaField from "@/app/components/ReusableComponents/Fields/TextareaField";
import DragAndDrop from "@/app/components/ReusableComponents/DragAndDrop";

type IFormHealthBook = {
  picture?:string,
  species: string,
  name: string,
  breed: string,
  coat: string
  gender: string,
  birthCountry: string,
  birthDate: Date,
  identificationType: string,
  identificationDate: Date,
  identificationPlace: string,
  identificationNumber: number,
  description?:string
};

const validationSchema = yup.object({
  picture: yup.string(),
  species: yup.string().required("Ce champs est requis"),
  name: yup.string().required("Ce champs est requis"),
  breed: yup.string().required("Ce champs est requis"),
  coat: yup.string().required("Ce champs est requis"),
  gender: yup.string().required("Ce champs est requis"),
  birthCountry: yup.string().required("Ce champs est requis"),
  birthDate: yup.date().required("Ce champs est requis"),
  identificationType: yup.string().required("Ce champs est requis"),
  identificationDate: yup.date().required("Ce champs est requis"),
  identificationPlace: yup.string().required("Ce champs est requis"),
  identificationNumber: yup.number().required("Ce champs est requis"),
  description: yup.string()
});

const AddAnimal = () => {
  const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm<IFormHealthBook>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  })

  const submitHealthBookInformations = (data: any) => {
    console.log(data);
  }

  const generalFields = [
    {
      component: <DragAndDrop name="picture" fileType={"image/png, image/jpeg"} register={register} watch={watch} setValue={setValue} errors={errors.picture?.message} />,
      classnames: "col-span-12 mb-5"
    },
    {
      component: <InputField type="text" label="espèce" name="species" register={register} errors={errors.species?.message} />,
      classnames: "col-span-6 mb-5 mr-2"
    },
    {
      component: <InputField type="text" label="nom" name="animalName" register={register} errors={errors.name?.message} />,
      classnames: "col-span-6 mb-5"
    },
    {
      component: <InputField type="text" label="race" name="race" register={register} errors={errors.breed?.message} />,
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
      component: <InputField type="text" label="provenance" name="country" register={register} errors={errors.birthCountry?.message} />,
      classnames: "mr-2 col-span-4 lg:col-span-5"
    },
    {
      component: <InputField type="date" label="date de naissance" name="birthDate" register={register} errors={errors.birthDate?.message} />,
      classnames: "col-span-4 lg:col-span-5"
    },
    {
      component: <InputField type="text" label="type d'identification" name="idType" register={register} errors={errors.identificationType?.message} />,
      classnames: "mr-2 col-span-6"
    },
    {
      component: <InputField type="date" label="date d'identification" name="idDate" register={register} errors={errors.identificationDate?.message} />,
      classnames: "col-span-6"
    },
    {
      component: <InputField type="text" label="lieu d'identification" name="idPlace" register={register} errors={errors.identificationPlace?.message} />,
      classnames: "col-span-12"
    },
    {
      component: <InputField type="text" label="numéro d'identification" name="idNumber" register={register} errors={errors.identificationNumber?.message} />,
      classnames: "mr-2 col-span-6"
    },
    {
      component: <TextareaField label="description" name="description" register={register} errors={errors.description?.message} />,
      classnames: "col-span-12"
    },
  ];

  return (
    <>
      <HeatlhBookForm
        titlePage="Ajouter un animal"
        imgSrc={Chat}
        handleSubmit={handleSubmit(submitHealthBookInformations)}
        fields={generalFields}
      />
    </>
  )
}

export default AddAnimal;