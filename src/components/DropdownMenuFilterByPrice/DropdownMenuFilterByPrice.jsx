/* eslint-disable react/prop-types */
import { useState } from "react";

export default function DropdownMenuFilterByPrice({
  sortAscOrder,
  sortDescOrder,
}) {
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
        <button
          className="dropdown-item"
          onClick={() => {
            sortAscOrder(), setToggle(false);
          }}
        >
          От ниска към висока
        </button>
        <button
          className="dropdown-item"
          onClick={() => {
            sortDescOrder(), setToggle(false);
          }}
        >
          От висока към ниска
        </button>
      </div>
    </div>
  );
}
