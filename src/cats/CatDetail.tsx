import { Cat } from "./types";
import { MdModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

interface CatDetailProps {
  cat: Cat;
  handleEditModal: (toggle: boolean, Cat?: Cat) => void;
  handleRemove: (cat: Cat) => void;
}

export const CatDetail = ({
  cat,
  handleEditModal,
  handleRemove,
}: CatDetailProps) => {
  return (
    <div className="p-6 sm:p-2 bg-white rounded-lg shadow-md m-4 max-w-[25rem] h-[16rem]">
      <div className="flex w-full justify-end gap-2">
        <MdModeEdit
          size={20}
          onClick={() => handleEditModal(true, cat)}
          className="cursor-pointer"
          aria-label="Edit Cat Icon"
        />
        <RxCross2
          size={20}
          className="cursor-pointer"
          onClick={() => handleRemove(cat)}
          aria-label="Delete Cat Icon"
        />
      </div>
      <div className="flex gap-4 h-[80%]">
        <div className="w-[48%] bg-gray-100">
          {cat.image && (
            <img
              className="object-contain"
              height="100%"
              width="100%"
              src={cat.image}
              alt={cat.name}
            />
          )}
        </div>
        <div className="w-[60%] overflow-hidden">
          <p className="font-bold">{cat.name}</p>
          <p className="mt-2">{cat.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default CatDetail;
