import React, { ButtonHTMLAttributes, ReactElement } from "react";

interface IInputField extends ButtonHTMLAttributes<HTMLButtonElement> {
  isValidForm: boolean
  iconBtn?: ReactElement
  textBtn: string
}

const InputField = ({
  isValidForm,
  iconBtn,
  textBtn,
  ...rest
}: IInputField) => {
  return (
    <div className="mt-5">
      <button
        type="submit"
        disabled={!isValidForm}
        className="group relative flex w-full justify-center rounded-md bg-dark-main-color px-3 py-2 text-sm font-semibold
          text-white hover:bg-darker-main-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-indigo-600 disabled:bg-zinc-400"
        {...rest}
      >
        {iconBtn}
        {textBtn}
      </button>
    </div>
  )
}

export default InputField;