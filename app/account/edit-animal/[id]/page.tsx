'use client';

import React, { useContext, useEffect, useState } from "react";
import HeatlhBookForm from "@/app/components/ReusableComponents/Form/HeatlhBookForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import * as yup from "yup";
import dayjs from "dayjs";
import DragAndDrop from "@/app/components/ReusableComponents/DragAndDrop";
import { isDefined, requestGet, requestPatch } from "@/app/components/utils";
import { IPet } from "@/app/components/types";
import { toast } from "react-toastify";
import InputField from "@/app/components/ReusableComponents/Fields/InputField";
import SelectField from "@/app/components/ReusableComponents/Fields/SelectField";
import TextareaField from "@/app/components/ReusableComponents/Fields/TextareaField";
import Chat from "@/app/components/assets/chat.jpg";

const validationSchema = yup.object({
  // picture: yup.string(),
  specie: yup.string().required("Ce champs est requis"),
  name: yup.string().required("Ce champs est requis"),
  breed: yup.string().required("Ce champs est requis"),
  coat: yup.string().required("Ce champs est requis"),
  gender: yup.string().required("Ce champs est requis"),
  birthCountry: yup.string().required("Ce champs est requis"),
  birthDate: yup.date().required("Ce champs est requis"),
  deceased: yup.bool(),
  deceaseDate: yup.date().when(
    'deceased',
    ([deceased], schema) => {
      return deceased === true ? schema.required("La date de décès est requise") : schema.notRequired();
    }
  ),
  identificationType: yup.string().required("Ce champs est requis"),
  identificationDate: yup.date().required("Ce champs est requis"),
  identificationPlace: yup.string().required("Ce champs est requis"),
  identificationNumber: yup.string().required("Ce champs est requis"),
  description: yup.string()
});

const EditAnimal = ({ params }: { params: { id: number } }) => {
  const { handleSubmit, register, watch, setValue, setError, reset, formState: { isValid, errors } } = useForm<IPet>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });
  const { authentication } = useContext(AuthContext) as IContext;
  const idPet = params.id;
  const [ petInfo, setPetInfo ] = useState<IPet|null>(null);

  useEffect(() => {
    if (authentication?.accessToken) {
      requestGet<IPet>(`pets/${idPet}`, authentication?.accessToken)
        .then((response) => {
          const birthDate = new Date(response?.data?.birthDate);
          const deceaseDate = isDefined(response?.data.deceaseDate) ? new Date(response?.data.deceaseDate) : null;
          const identificationDate = new Date(response?.data?.identificationDate);
          setPetInfo({ ...response?.data, birthDate: birthDate, deceaseDate: deceaseDate, identificationDate: identificationDate });
        }).catch((e) => {
          e.response.data;
          toast.error("Un problème est survenu lors de la récupération des données");
        });
    }
  }, [ authentication?.accessToken, idPet ]);

  useEffect(() => {
    if (petInfo) {
      reset(petInfo);

      petInfo.deceaseDate && setValue('deceaseDate', dayjs(petInfo.deceaseDate).format("YYYY-MM-DD"))
      setValue('birthDate', dayjs(petInfo.birthDate).format("YYYY-MM-DD"))
      setValue('identificationDate', dayjs(petInfo.identificationDate).format("YYYY-MM-DD"))
    }
  }, [reset, petInfo, setValue]);

  const submitEditAnimal = (data: IPet) => {
    const dataWithFormattedDates = {
      ...data,
      birthDate: dayjs(data.birthDate).toISOString(),
      deceaseDate: isDefined(data.deceaseDate) ? dayjs(data.deceaseDate).toISOString() : null,
      identificationDate: dayjs(data.identificationDate).toISOString()
    }

    requestPatch<IPet>(`pets/${idPet}`, dataWithFormattedDates, authentication?.accessToken)
      .then((response) => {
        const birthDate = new Date(response?.data?.birthDate);
        const deceaseDate = isDefined(response?.data.deceaseDate) ? new Date(response?.data.deceaseDate) : null;
        const identificationDate = new Date(response?.data?.identificationDate);
        setPetInfo({ ...response?.data, birthDate: birthDate, deceaseDate: deceaseDate, identificationDate: identificationDate });
        toast.success("Les données ont été mis à jour");
      }).catch((e) => {
        e.response.data;
        toast.error("Un problème est survenu lors de l'édition des données");
      });
  }

  const generalFields = [
    // {
    //   component: <DragAndDrop name="picture" fileType={"image/png, image/jpeg"} register={register} watch={watch} setValue={setValue} errors={errors.picture?.message} />,
    //   classnames: "col-span-12 mb-5"
    // },
    {
      component: <InputField type="checkbox" inline label="Décès" name="deceased" register={register} errors={errors.deceased?.message} />,
      classnames: "col-span-2 mb-5 mr-2"
    },
    {
      component: <InputField type="date" label="Date de décès" name="deceaseDate" register={register} errors={errors.deceaseDate?.message} />,
      classnames: "col-span-4 mb-5 mr-2"
    },
    {
      component: <InputField type="text" label="espèce" name="specie" register={register} errors={errors.specie?.message} />,
      classnames: "col-span-6 mb-5"
    },
    {
      component: <InputField type="text" label="nom" name="name" register={register} errors={errors.name?.message} />,
      classnames: "col-span-6 mb-5 mr-2"
    },
    {
      component: <InputField type="text" label="race" name="breed" register={register} errors={errors.breed?.message} />,
      classnames: "col-span-6 mb-5"
    },
    {
      component: <InputField type="text" label="pelage" name="coat" register={register} errors={errors.coat?.message} />,
      classnames: "col-span-6 mb-5 mr-2"
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
    <HeatlhBookForm
      titlePage="Éditer votre animal"
      imgSrc={Chat}
      handleAddAnimal={handleSubmit(submitEditAnimal)}
      fields={generalFields}
      isValid={isValid}
    />
  )
}

export default EditAnimal;