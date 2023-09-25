import { useState } from "react";
import { Cat, Gender } from "./types";
import { CatDetail } from "./CatDetail";
import { catsData } from "./testData";
import { EditModal } from "./EditCat/EditModal";
import { updateCat, removeCat, sortCats } from "./api";
import { AddCat } from "./AddCat";
import { Sort, SortDirection } from "./Sort";
import { getCatsData, setCatsData } from "./store";
import Search from "./Search";

export const CatContainer = () => {
  const [cats, setCats] = useState<Cat[]>(catsData);
  const [displayEditModal, setShowEditModal] = useState(false);
  const [cat, setCat] = useState<Cat | undefined>(undefined);

  const handleEditModal = (toggle: boolean, cat?: Cat) => {
    setCat(cat);
    setShowEditModal(toggle);
  };

  const toggleModal = (toggle: boolean) => {
    setShowEditModal(toggle);
  };

  const handleSubmit = (cat: Cat) => {
    const updatedCats = updateCat(cat, cats);
    setCatsData(updatedCats);
    setCats(updatedCats);
    setShowEditModal(false);
  };

  const handleRemove = (cat: Cat) => {
    const updatedCats = removeCat(cat, cats);
    setCatsData(updatedCats);
    setCats(updatedCats);
  };

  const handleAdd = (cats: Cat[]) => {
    const updatedCats = updateCat(
      {
        id: 0,
        name: "Untitled Kitty",
        gender: Gender.Female,
        birthDate: new Date(),
        bio: "Untitled Bio",
        image: "",
      },
      cats
    );
    setCatsData(updatedCats);
    setCats(updatedCats);
  };

  const handleSort = (sortDirection: SortDirection) => {
    setCats(sortCats(sortDirection, cats));
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      setCats(
        getCatsData().filter((cat) =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setCats(getCatsData);
    }
  };

  return (
    <div>
      <div className="flex w-full p-4 flex-col md:flex-row">
        <div className="text-4xl text-gray-800 font-bold w-[75%]">
          Furry Friends
        </div>
        <div className="md:w-[25%] md:mt-0 mt-4 w-full align-bottom">
          <Search handleSearch={handleSearch} />
        </div>
      </div>
      <div className="flex w-full justify-end pr-4">
        <Sort handleSort={handleSort} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        {cats.map((cat) => (
          <CatDetail
            key={cat.id}
            cat={cat}
            handleEditModal={handleEditModal}
            handleRemove={handleRemove}
          />
        ))}
        <AddCat handleAdd={handleAdd} cats={cats} />
        <EditModal
          show={displayEditModal}
          toggleModal={toggleModal}
          cat={cat}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CatContainer;
