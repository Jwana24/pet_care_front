import React, { BaseSyntheticEvent } from "react";
import Image, { StaticImageData } from "next/image";
import SubmitButton from "@/app/components/ReusableComponents/Fields/SubmitButton";

interface IHealthBookForm {
  titlePage: string
  imgSrc: StaticImageData
  handleAddAnimal: (e?: BaseSyntheticEvent | undefined) => Promise<void>
  edit?: boolean
  fields: Array<IFieldElement>
  isValid: boolean
}

interface IFieldElement {
  classnames: string
  component: JSX.Element
}

const HeatlhBookForm = ({ titlePage, imgSrc, handleAddAnimal, edit, fields, isValid }: IHealthBookForm) => {
  return (
    <div className="w-full m-8 block max-w bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex justify-center items-center h-14 bg-dark-main-color rounded-tl-lg rounded-tr-lg text-3xl
        text-white uppercase tracking-widest"
      >
        {titlePage}
      </div>
      <form onSubmit={handleAddAnimal} className="p-5">
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12">
          {edit && (
            <div className="min-w-[16rem] h-80 col-span-12 lg:col-span-4 mb-5 lg:mb-0 lg:mr-5">
              <Image
                src={imgSrc}
                alt="Picture of the animal"
                width={200}
                height={180}
                className="w-full h-full object-top object-cover rounded"
              />
            </div>
          )}
          <div className={`col-span-12 ${edit && "lg:col-span-8"}`}>
            <div className="grid grid-cols-12">
              {fields.map((field, index) => (
                <div key={index} className={field.classnames}>
                  {field.component}
                </div>
              ))}
            </div>
          </div>
        </div>
        <SubmitButton
          isValidForm={isValid}
          textBtn="Enregistrer les informations"
        />
      </form>
    </div>
  )
}

export default HeatlhBookForm;