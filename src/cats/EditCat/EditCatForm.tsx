import { useState } from "react";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cat, Gender } from "../types";
import { useForm } from "react-hook-form";
import { convertFileToBase64 } from "../../utils";

export interface CatFormInput {
  name: string;
  birthDate: Date;
  gender: Gender;
  bio?: string;
  image?: string;
}

interface EditCatFormProps {
  cat?: Cat;
  toggleModal: (toggle: boolean) => void;
  onSubmit: (cat: Cat) => void;
}

const catSchema = z.object({
  name: z.string().min(1, { message: "First name is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  birthDate: z.string().min(1, { message: "Last name is required" }),
  bio: z.string().nullable(),
  image: z.string().nullable(),
});

export const EditCatForm = ({
  cat,
  toggleModal,
  onSubmit,
}: EditCatFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CatFormInput>({
    defaultValues: cat || {},
    resolver: zodResolver(catSchema),
  });
  // extracting the type
  // type CatSchemaType = z.infer<typeof catSchema>;
  const [files, setFiles] = useState<File>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      const base64Image = await convertFileToBase64(acceptedFiles?.[0]);
      setValue("image", base64Image as string);
      setFiles(acceptedFiles[0]);
    },
  });

  return (
    <div className="w-[30rem]">
      <form
        onSubmit={handleSubmit(async (data) => {
          onSubmit({
            id: cat?.id || 0,
            name: data.name,
            gender: data.gender,
            birthDate: data.birthDate,
            bio: data.bio,
            image: data.image || cat?.image,
          });
        })}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            aria-label="name"
            {...register("name")}
            placeholder="First name"
          />
          {errors.name?.message && (
            <p className="mt-2 text-sm text-red-500 ">{errors.name?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="birthDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            BirthDate
          </label>
          <input
            type="date"
            aria-label="birthDate"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            {...register("birthDate")}
            placeholder="BirthDate"
          />
          {errors.birthDate?.message && (
            <p className="mt-2 text-sm text-red-500 ">
              {errors.birthDate?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Gender
          </label>
          <select
            aria-label="gender"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            {...register("gender", { required: true })}
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="mt-2 text-sm text-red-500 ">
              {errors.gender?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="bio"
            aria-label="bio"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Bio
          </label>
          <textarea
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            {...register("bio")}
            placeholder="Bio"
          />
          {errors.bio?.message && (
            <p className="mt-2 text-sm text-red-500 ">{errors.bio?.message}</p>
          )}
        </div>
        <div className="mt-5">
          <div
            {...getRootProps({
              className:
                "dropzone bg-gray-100 h-32 flex items-center justify-center",
            })}
          >
            <input {...getInputProps()} />
            <p>Drop image here or click to upload</p>
          </div>
          <div>{files?.name}</div>
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => toggleModal(false)}
          >
            Close
          </button>
          <button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCatForm;
