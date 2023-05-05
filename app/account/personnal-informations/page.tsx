'use client';

import React, { useContext } from "react";
import { IPetOwner, IUser, UserContext } from "@/app/components/Private/UserProvider";
import InputField from "@/app/components/ReusableComponents/Fields/InputField";
import SelectField from "@/app/components/ReusableComponents/Fields/SelectField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
  gender: yup.string().required("Ce champs est requis"),
  firstName: yup.string().required("Ce champs est requis"),
  lastName: yup.string().required("Ce champs est requis"),
  address: yup.string().required("Ce champs est requis"),
  zipCode: yup.string().required("Ce champs est requis"),
  city: yup.string().required("Ce champs est requis"),
  country: yup.date().required("Ce champs est requis"),
  phone: yup.string().required("Ce champs est requis")
});

const PersonnalInfos = () => {
  const userContext = useContext(UserContext);

  const { handleSubmit, register, formState: { errors } } = useForm<IPetOwner>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  })

  const submitUser = (data: any) => {
    console.log(data)
  }

  const personnalInfosFields = [
    {
      component: <SelectField
        label="civilité"
        name="gender"
        register={register}
        options={[{ value: "female", optionName: "F" }, { value: "male", optionName: "M" }]}
        errors={errors.gender?.message}
      />,
      classnames: "col-span-12 md:col-span-6 lg:col-span-2 md:mr-2"
    },
    {
      component: <InputField type="text" label="nom" name="lastName" register={register} errors={errors.firstName?.message} />,
      classnames: "col-span-12 md:col-span-6 lg:col-span-5 mb-5 lg:mr-2"
    },
    {
      component: <InputField type="text" label="prénom" name="firstName" register={register} errors={errors.lastName?.message} />,
      classnames: "col-span-12 md:col-span-6 lg:col-span-5 mb-5 md:mr-2 lg:mr-0"
    },
    // {
    //   component: <InputField type="text" label="adresse" name="address" register={register} errors={errors.address?.message} />,
    //   classnames: "col-span-6 mb-5"
    // },{
    //   component: <InputField type="text" label="code postal" name="zipCode" register={register} errors={errors.zipCode?.message} />,
    //   classnames: "col-span-6 mb-5"
    // },
    // {
    //   component: <InputField type="text" label="ville" name="city" register={register} errors={errors.city?.message} />,
    //   classnames: "mr-2 col-span-4 lg:col-span-5"
    // },
    // {
    //   component: <InputField type="text" label="pays" name="country" register={register} errors={errors.country?.message} />,
    //   classnames: "mr-2 col-span-4 lg:col-span-5"
    // },
    // {
    //   component: <InputField type="date" label="téléphone" name="phone" register={register} errors={errors.phone?.message} />,
    //   classnames: "col-span-4 lg:col-span-5"
    // }
  ];

  return (
    <div className="w-full m-8 block max-w bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex justify-center items-center h-14 bg-dark-main-color rounded-tl-lg rounded-tr-lg text-3xl
        text-white uppercase tracking-widest"
      >
        Informations personnelles
      </div>
      <form onSubmit={handleSubmit(submitUser)} className="p-5">
        <div className="mt-5 grid grid-cols-12">
          {/*civilité : {userContext?.petOwner?.gender}, nom, prénom, adresse postale, code postal, ville, pays, téléphone*/}
          {/*<div className="mt-5 col-span-1 lg:col-span-2 border-2">*/}
            {personnalInfosFields.map((field, index) => (
              <div key={index} className={field.classnames}>
                {field.component}
              </div>
            ))}
        </div>
      </form>
    </div>
  )
}

export default PersonnalInfos;