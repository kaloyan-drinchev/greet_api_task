/* eslint-disable react/prop-types */
import { useState } from "react";

export default function DropdownMenuFilterByPrice({ sortByAsc, sortByDesc }) {
  const [toggle, setToggle] = useState(false);

  const dropdownMenuToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className={`dropdown ${toggle ? "show" : ""}`}>
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        onClick={dropdownMenuToggle}
        id="dropdownMenuButton"
      >
        Сортирай по Цена
      </button>
      <div className={`dropdown-menu ${toggle ? "show" : ""}`}>
        <button className="dropdown-item" onClick={sortByAsc}>
          От ниска към висока
        </button>
        <button className="dropdown-item" onClick={sortByDesc}>
          От висока към ниска
        </button>
      </div>
    </div>
  );
}
