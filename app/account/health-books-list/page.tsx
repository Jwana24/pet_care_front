'use client';

import { requestGet } from "@/app/components/utils";
import { useContext, useEffect, useState } from "react";
import { AuthContext, IContext } from "@/app/components/Private/AuthProvider";
import AnimalCard from "@/app/account/health-books-list/(AnimalCard)/AnimalCard";
import { IPet } from "@/app/components/types";

const HealthBooksList = () => {
  const [ pets, setPets ] = useState([]);
  const { authentication } = useContext(AuthContext) as IContext;

  useEffect(() => {
    if (authentication?.accessToken) {
      requestGet('pets', authentication?.accessToken).then((response) => setPets(response?.data))
    }
  }, [ authentication?.accessToken ]);

  return (
    <div className="w-full m-8 block max-w">
      <h1 className="text-dark-main-color text-3xl uppercase mb-5">Liste des carnets de santé</h1>
      {pets?.map((pet: IPet) => (
        <div key={pet.id} className="mb-5">
          <AnimalCard pet={pet} />
        </div>
      ))}
    </div>
  )
}

export default HealthBooksList;