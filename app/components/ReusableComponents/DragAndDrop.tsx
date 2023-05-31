import React, { DragEvent, ChangeEvent, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface DragAndDrop {
  name: string
  fileType?: string
  register: UseFormRegister<any>
  errors: string | undefined
}

const DragAndDrop = ({ name, fileType,register, errors, ...rest }: DragAndDrop) => {
  const [ dragActive, setDragActive ] = useState(false);
  const { ref } = register(name);

  console.log(ref)

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleFile = (data: any) => {
    console.log(data)
  }

  const handleChange = (e: ChangeEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      handleFile(file);
    }
  };

  const onButtonClick = () => {
    // ref?.current?.click();
  };

  return (
    <div className="h-64 w-96 max-w-full text-center relative" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input
        type="file"
        accept={fileType}
        className="hidden"
        multiple={true}
        {...register(name, {
          onChange: handleChange
        })}
        {...rest}
      />
      <label
        className={`h-full flex items-center justify-center border-2 rounded-2xl border-dashed border-slate-200 bg-slate-50
          ${dragActive ? "bg-white" : ""}`}
        htmlFor="input-file-upload"
      >
        <div>
          <p>Glisser / déposer un fichier ici, ou</p>
          <button className="cursor-pointer p-1 text-base border-none bg-transparent hover:underline" onClick={onButtonClick}>
            téléverser un fichier
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          className="absolute w-full h-full rounded-2xl top-0 bottom-0 right-0 left-0"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
      { errors && <small className="text-red-600 font-medium">{errors}</small> }
    </div>
  )
}

export default DragAndDrop;