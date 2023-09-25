import { AiOutlinePlusCircle } from "react-icons/ai";
import { Cat } from "./types";

interface AddCatProps {
  handleAdd: (cats: Cat[]) => void;
  cats: Cat[];
}

export const AddCat = ({ cats, handleAdd }: AddCatProps) => {
  return (
    <div className="max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-md m-4 w-[25rem] h-[16rem]">
      <div className="flex gap-4 h-full">
        <div className="flex flex-col w-full h-full justify-center items-center gap-2 ">
          <AiOutlinePlusCircle
            aria-label="Add Cat Icon"
            size={40}
            className="cursor-pointer"
            onClick={() => handleAdd(cats)}
          />
          <p>Add</p>
        </div>
      </div>
    </div>
  );
};

export default AddCat;
