import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export enum SortDirection {
  None = "none",
  Asc = "asc",
  Desc = "desc",
}

export interface SortProps {
  handleSort: (sortDirection: SortDirection) => void;
}

export const getSortDirection = (sortDirection: SortDirection) => {
  switch (sortDirection) {
    case SortDirection.None:
      return SortDirection.Asc;
    case SortDirection.Asc:
      return SortDirection.Desc;
    case SortDirection.Desc:
      return SortDirection.Asc;
  }
};

export const Sort = ({ handleSort }: SortProps) => {
  const [sortDirection, setSortDirectoin] = useState(SortDirection.None);

  const updateSort = () => {
    let newSortDirection = getSortDirection(sortDirection);
    setSortDirectoin(newSortDirection);
    handleSort(newSortDirection);
  };

  let sortIconMarkup = (
    <FaSort
      aria-label="Sort Icon"
      className="inline"
      onClick={() => {
        updateSort();
      }}
    />
  );

  switch (sortDirection) {
    case SortDirection.Asc:
      sortIconMarkup = (
        <FaSortUp
          aria-label="Sort Icon"
          className="inline"
          onClick={() => {
            updateSort();
          }}
        />
      );
      break;
    case SortDirection.Desc:
      sortIconMarkup = (
        <FaSortDown
          aria-label="Sort Icon"
          className="inline"
          onClick={() => {
            updateSort();
          }}
        />
      );
      break;
  }

  return (
    <>
      <div>
        Sort by: <b>Name</b>
      </div>
      <div>{sortIconMarkup}</div>
    </>
  );
};

export default Sort;
