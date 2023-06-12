'use client';

import React, { useContext } from "react";
import { toast } from "react-toastify";
import InputField from "@/app/components/ReusableComponents/Fields/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { requestPost } from "@/app/components/utils";
import HeatlhBookForm from "@/app/components/ReusableComponents/Form/HeatlhBookForm";
import SelectField from "@/app/components/ReusableComponents/Fields/SelectField";
import TextareaField from "@/app/components/ReusableComponents/Fields/TextareaField";
import DragAndDrop from "@/app/components/ReusableComponents/DragAndDrop";
import Chat from '../../components/assets/chat.jpg';

export type IFormNewAnimal = {
  picture?:string,
  specie: string,
  name: string,
  breed: string,
  coat: string
  gender: string,
  birthCountry: string,
  birthDate: Date,
  identificationType: string,
  identificationDate: Date,
  identificationPlace: string,
  identificationNumber: string,
  description?:string
};

const validationSchema = yup.object({
  picture: yup.string(),
  specie: yup.string().required("Ce champs est requis"),
  name: yup.string().required("Ce champs est requis"),
  breed: yup.string().required("Ce champs est requis"),
  coat: yup.string().required("Ce champs est requis"),
  gender: yup.string().required("Ce champs est requis"),
  birthCountry: yup.string().required("Ce champs est requis"),
  birthDate: yup.date().required("Ce champs est requis"),
  identificationType: yup.string().required("Ce champs est requis"),
  identificationDate: yup.date().required("Ce champs est requis"),
  identificationPlace: yup.string().required("Ce champs est requis"),
  identificationNumber: yup.string().required("Ce champs est requis"),
  description: yup.string()
});

const AddAnimal = () => {
  const { handleSubmit, register, watch, setValue, setError, reset, formState: { isValid, errors } } = useForm<IFormNewAnimal>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });
  const { authentication } = useContext(AuthContext) as IContext;

  const submitHealthBookInformations = async (data: IFormNewAnimal): Promise<void> => {
    await requestPost<IFormNewAnimal>('pets', {
      ...data,
      picture: null,

    }, authentication?.accessToken)
      .then(async (response) => {
        if (!response) {
          // setError('password', { type: requestStatus.statusCode.toString(), message: requestStatus.message });
          toast.error("Un problème est survenu lors de l'envoi du formulaire");
          console.log('error');
        }
        reset();
        toast.success("Le carnet de santé de votre animal a été ajouté");
      })
      .catch((e) => {
        e.response.data;
        toast.error("Un problème est survenu lors de l'envoi du formulaire");
      })
  }

  const generalFields = [
    {
      component: <DragAndDrop name="picture" fileType={"image/png, image/jpeg"} register={register} watch={watch} setValue={setValue} errors={errors.picture?.message} />,
      classnames: "col-span-12 mb-5"
    },
    {
      component: <InputField type="text" label="espèce" name="specie" register={register} errors={errors.specie?.message} />,
      classnames: "col-span-6 mb-5 mr-2"
    },
    {
      component: <InputField type="text" label="nom" name="name" register={register} errors={errors.name?.message} />,
      classnames: "col-span-6 mb-5"
    },
    {
      component: <InputField type="text" label="race" name="breed" register={register} errors={errors.breed?.message} />,
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
      component: <InputField type="text" label="provenance" name="birthCountry" register={register} errors={errors.birthCountry?.message} />,
      classnames: "mr-2 col-span-4 lg:col-span-5"
    },
    {
      component: <InputField type="date" label="date de naissance" name="birthDate" register={register} errors={errors.birthDate?.message} />,
      classnames: "col-span-4 lg:col-span-5"
    },
    {
      component: <SelectField
        label="type d'identification"
        name="identificationType"
        register={register}
        options={[{ value: "puce", optionName: "Puce" }, { value: "tatoo", optionName: "Tatouage" }]}
        errors={errors.identificationType?.message}
      />,
      classnames: "mr-2 col-span-6"
    },
    {
      component: <InputField type="date" label="date d'identification" name="identificationDate" register={register} errors={errors.identificationDate?.message} />,
      classnames: "col-span-6"
    },
    {
      component: <InputField type="text" label="lieu d'identification" name="identificationPlace" register={register} errors={errors.identificationPlace?.message} />,
      classnames: "col-span-12"
    },
    {
      component: <InputField type="text" label="numéro d'identification" name="identificationNumber" register={register} errors={errors.identificationNumber?.message} />,
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
        handleAddAnimal={handleSubmit(submitHealthBookInformations)}
        fields={generalFields}
        isValid={isValid}
      />
    </>
  )
}

export default AddAnimal;