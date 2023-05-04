'use client';

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  DocumentPlusIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";

interface IUser {
  email: string
  createdAt: Date
  updatedAt: Date
  petOwner: IPetOwner
}

interface IPetOwner {
  gender: string
  firstName: string
  lastName: string
  address: string
  zipCode: string
  city: string
  country: string
  phone: string
}

const Account = () => {
  const [userData, setUserData] = useState<IUser>();

  const getConnectedUser = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    })
      .then((response) => setUserData(response.data))
  }

  useEffect(() => {
    (
      async () => {
        try {
          await getConnectedUser();
        } catch (e) {
          console.error(e);
        }
      }
    )();
  }, [])

  return (
    <div className="w-full p-12">
      <div className="text-5xl mb-9">Bonjour <span className="font-bold">{userData?.petOwner?.firstName}</span> !</div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;pour gérer les carnets de santé de vos animaux, vous pouvez aller sur la page&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div className="w-6"><BookOpenIcon /></div>
          &nbsp;Carnet de santé
        </div>
      </div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;pour ajouter un nouvel animal et son carnet de santé, rendez-vous sur la page&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div className="w-6"><DocumentPlusIcon /></div>
          &nbsp;Ajouter un animal
        </div>
      </div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;si vous souhaitez modifier vos informations personnelles comme vos identifiants de connexion ou votre adresse postale,
        vous pouvez vous rendre sur la page&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div className="w-6"><IdentificationIcon /></div>
          &nbsp;Informations personnelles
        </div>
      </div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;si vous souhaitez changer les paramètres de votre compte, vous pouvez vous rendre sur la page&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div className="w-6"><Cog6ToothIcon /></div>
          &nbsp;Paramètres du compte
        </div>
      </div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;pour vous déconnectez il vous suffit de cliquer sur le bouton&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div className="w-6"><ArrowRightOnRectangleIcon /></div>
          &nbsp;Déconnexion&nbsp;
        </div>
        situé en bas du menu
      </div>
    </div>
  )
}

export default Account;