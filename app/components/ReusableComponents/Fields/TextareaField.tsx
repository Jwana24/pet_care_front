import React, { HTMLAttributes, TextareaHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface ITextareaField extends TextareaHTMLAttributes<HTMLElement> {
  inline?: boolean
  label: string
  name: string
  cols?: number
  rows?: number
  register: UseFormRegister<any>
  errors: string | undefined
}

const TextareaField = ({
  inline,
  label,
  name,
  cols,
  rows,
  register,
  errors,
  ...rest
}: ITextareaField) => {
  return (
    <div className={`mb-5 ${inline ? "flex items-center" : ""}`}>
      <label htmlFor={name} className={inline ? "w-28" : ""}>{label}</label>
      <div>
        <textarea
          cols={cols}
          rows={rows}
          {...register(name)}
          className={`block w-full ${!inline && "mt-3.5"} border border-gray-300 py-1.5 px-3.5 text-gray-900 focus:ring-1 focus:ring-inset
              sm:text-sm sm:leading-6 rounded-md`}
          {...rest}
        ></textarea>
      </div>
      { errors && <small className="text-red-600 font-medium">{errors}</small> }
    </div>
  )
}

export default TextareaField;