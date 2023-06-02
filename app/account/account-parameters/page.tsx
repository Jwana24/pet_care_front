'use client';

import SubmitButton from "@/app/components/ReusableComponents/Fields/SubmitButton";
import React, { useContext, useEffect } from "react";
import { IUser, IUserContext, UserContext } from "@/app/components/Private/UserProvider";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { requestPatch } from "@/app/components/utils";
import * as yup from "yup";
import InputField from "@/app/components/ReusableComponents/Fields/InputField";
import PasswordField from "@/app/components/ReusableComponents/Fields/PasswordField";

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string(),
  confirmPassword: yup.string().oneOf(
    [yup.ref("password"), undefined],
    "La confirmation du mot de passe ne correspond pas"
    )
});

const AccountParameters = () => {
  const { user, setUser } = useContext(UserContext) as IUserContext;
  const { authentication } = useContext(AuthContext) as IContext;

  const { handleSubmit, register, reset, formState: { isValid, errors } } = useForm<IUser>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const submitUserParameters = (data: IUser) => {
    requestPatch<IUser>(`users/${user?.id}`, {
      ...data,
      id: undefined,
      password: data.password === "" ? undefined : data.password,
      confirmPassword: undefined

    }, authentication?.accessToken)
      .then((response) => user && setUser(response.data))
  }

  useEffect(() => {
    user && reset(user);
  }, [ reset, user ])

  // Add delete account

  const userParametersFields = [
    {
      component: <InputField type="text" label="Adresse email" name="email" register={register} errors={errors.email?.message} />,
      classnames: "col-span-12 md:col-span-5 lg:col-span-6 mb-5 md:mr-2"
    },
    {
      component: <PasswordField label="Mot de passe" name="password" autoComplete="current-password" register={register} errors={errors.password?.message} />,
      classnames: "col-span-12 md:col-span-5 lg:col-span-3 mb-5 lg:mr-2"
    },
    {
      component: <PasswordField label="Confirmer le mot de passe" name="confirmPassword" register={register} errors={errors.confirmPassword?.message} />,
      classnames: "col-span-12 md:col-span-5 lg:col-span-3 mb-5 lg:mr-2"
    },
  ]

  return (
    <div className="w-full h-min m-8 block max-w bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex justify-center items-center h-14 bg-dark-main-color rounded-tl-lg rounded-tr-lg text-3xl
        text-white uppercase tracking-widest"
      >
        Paramètres du compte
      </div>
      <form onSubmit={handleSubmit(submitUserParameters)} className="p-5">
        <div className="mt-5 grid grid-cols-12">
          {userParametersFields.map((field, index) => (
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

export default AccountParameters;