'use client';

import React, { useContext } from "react";
import {
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  DocumentPlusIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";
import { UserContext } from "@/app/components/Private/UserProvider";

const Account = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="w-full p-12">
      <div className="text-5xl mb-9">Bonjour <span className="font-bold">{userContext?.petOwner?.firstName}</span> !</div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;pour gérer les carnets de santé de vos animaux, vous pouvez aller sur la page&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div><BookOpenIcon width={24} /></div>
          &nbsp;Carnet de santé
        </div>
      </div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;pour ajouter un nouvel animal et son carnet de santé, rendez-vous sur la page&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div><DocumentPlusIcon width={24} /></div>
          &nbsp;Ajouter un animal
        </div>
      </div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;si vous souhaitez modifier vos informations personnelles comme vos identifiants de connexion ou votre adresse postale,
        vous pouvez vous rendre sur la page&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div><IdentificationIcon width={24} /></div>
          &nbsp;Informations personnelles
        </div>
      </div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;si vous souhaitez changer les paramètres de votre compte, vous pouvez vous rendre sur la page&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div><Cog6ToothIcon width={24} /></div>
          &nbsp;Paramètres du compte
        </div>
      </div>
      <div className="mb-5 flex items-center">
        &#10132;&nbsp;pour vous déconnectez il vous suffit de cliquer sur le bouton&nbsp;
        <div className="flex items-center text-lg text-dark-main-color">
          <div><ArrowRightOnRectangleIcon width={24} /></div>
          &nbsp;Déconnexion&nbsp;
        </div>
        situé en bas du menu
      </div>
    </div>
  )
}

export default Account;