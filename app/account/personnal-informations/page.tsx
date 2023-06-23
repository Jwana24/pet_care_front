'use client';

import React, { useContext, useEffect } from "react";
import { IPetOwnerEdit, IUserContext, UserContext } from "@/app/components/Private/UserProvider";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "@/app/components/ReusableComponents/Fields/InputField";
import SelectField from "@/app/components/ReusableComponents/Fields/SelectField";
import SubmitButton from "@/app/components/ReusableComponents/Fields/SubmitButton";
import { requestPatch } from "../../utils";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  gender: yup.string().required("Ce champs est requis"),
  firstName: yup.string().required("Ce champs est requis"),
  lastName: yup.string().required("Ce champs est requis"),
  address: yup.string().required("Ce champs est requis"),
  zipCode: yup.string().required("Ce champs est requis"),
  city: yup.string().required("Ce champs est requis"),
  country: yup.string().required("Ce champs est requis"),
  phone: yup.string().matches(new RegExp('^\\d{9}$'), "Le numéro de téléphone doit contenir 9 chiffres, sans le premier '0'").required("Ce champs est requis")
});

const PersonnalInfos = () => {
  const { user, setUser } = useContext(UserContext) as IUserContext;
  const { authentication } = useContext(AuthContext) as IContext;

  const { handleSubmit, register, reset, formState: { isValid, errors } } = useForm<IPetOwnerEdit>({
    mode: 'onChange',
    resolver: yupResolver<IPetOwnerEdit>(validationSchema)
  });

  const submitUser = (data: IPetOwnerEdit) => {
    requestPatch<IPetOwnerEdit>(`petOwners/${user?.petOwner?.id}`, {
      ...data,
      id: undefined,
      phone: `+33${data.phone}`
    }, authentication?.accessToken)
      .then((response) => {
        user && setUser({...user, petOwner: { ...response.data, phone: response.data.phone.slice(3) }});
        toast.success("Vos informations personnelles ont été mises à jour");
      })
  }

  useEffect(() => {
    reset(user?.petOwner);
  }, [ reset, user ])

  const personnalInfosFields = [
    {
      component: <SelectField
        label="civilité"
        name="gender"
        register={register}
        options={[{ value: "female", optionName: "F" }, { value: "male", optionName: "M" }]}
        errors={errors.gender?.message}
      />,
      classnames: "col-span-2 lg:col-span-1 md:mr-2"
    },
    {
      component: <InputField type="text" label="nom" name="lastName" register={register} errors={errors.firstName?.message} />,
      classnames: "col-span-12 md:col-span-5 lg:col-span-4 mb-5 md:mr-2"
    },
    {
      component: <InputField type="text" label="prénom" name="firstName" register={register} errors={errors.lastName?.message} />,
      classnames: "col-span-12 md:col-span-5 lg:col-span-4 mb-5 lg:mr-2"
    },
    {
      component: <InputField type="text" label="téléphone" preInput name="phone" register={register} errors={errors.phone?.message} />,
      classnames: "col-span-6 md:col-span-7 lg:col-span-3 md:mr-2 lg:mr-0"
    },
    {
      component: <InputField type="text" label="adresse postale" name="address" register={register} errors={errors.address?.message} />,
      classnames: "col-span-12 lg:col-span-10 mb-5 lg:mr-2"
    },
    {
      component: <InputField type="text" label="code postal" name="zipCode" register={register} errors={errors.zipCode?.message} />,
      classnames: "col-span-4 md:col-span-3 lg:col-span-2 mb-5 md:mr-2 lg:mr-0"
    },
    {
      component: <InputField type="text" label="ville" name="city" register={register} errors={errors.city?.message} />,
      classnames: "col-span-12 md:col-span-5 lg:col-span-3 md:mr-2"
    },
    {
      component: <InputField type="text" label="pays (3 premières lettres)" name="country" register={register} errors={errors.country?.message} />,
      classnames: "col-span-12 md:col-span-4 lg:col-span-3"
    }
  ];

  return (
    <div className="w-full h-min m-8 block max-w bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex justify-center items-center h-14 bg-dark-main-color rounded-tl-lg rounded-tr-lg text-3xl
        text-white uppercase tracking-widest"
      >
        Informations personnelles
      </div>
      <form onSubmit={handleSubmit(submitUser)} className="p-5">
        <div className="mt-5 grid grid-cols-12">
            {personnalInfosFields.map((field, index) => (
              <div key={index} className={field.classnames}>
                {field.component}
              </div>
            ))}
        </div>
        <SubmitButton
          isValidForm={isValid}
          textBtn="Enregistrer les modifications"
        />
      </form>
    </div>
  )
}

export default PersonnalInfos;