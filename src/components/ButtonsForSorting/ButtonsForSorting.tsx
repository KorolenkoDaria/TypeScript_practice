import React from "react";
import { useSort } from "../../context/SortContext/SortContext";

const ButtonsForSorting: React.FC = () => {
  const { sortBy, setSortBy } = useSort();
  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(evt.target.value as "updateDate " | "priority");
  };

  return (
    <div>
      <select name="select" value={sortBy} onChange={handleChange}>
        <option value="updateDate">Sorting by date</option>
        <option value="priority">Sorting by priority</option>
      </select>
    </div>
  );
};

export default ButtonsForSorting;
