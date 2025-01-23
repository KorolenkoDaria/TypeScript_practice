import React from "react";
import { useSort } from "../../context/SortContext/SortContext";

const ButtonsForSorting: React.FC = () => {
  const { sortBy, setSortBy } = useSort();
  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(evt.target.value as "updateDate " | "priority");
  };

  return (
    <div className="mb-5 ml-auto">
      <select
        className="outline-none text-xs text-rose-500  rounded-t-md"
        name="select"
        value={sortBy}
        onChange={handleChange}
      >
        <option className="border-none" value="updateDate">
          Sorting by date
        </option>
        <option value="priority">Sorting by priority</option>
      </select>
    </div>
  );
};

export default ButtonsForSorting;
