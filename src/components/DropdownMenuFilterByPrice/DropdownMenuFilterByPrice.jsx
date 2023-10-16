/* eslint-disable react/prop-types */
import { useState } from "react";

export default function DropdownMenuFilterByPrice({
  sortAscOrder,
  sortDescOrder,
  sortAscOrderByName,
  sortDescOrderByName,
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
        Сортирай
      </button>
      <div className={`dropdown-menu ${toggle ? "show" : ""}`}>
        <button
          className="dropdown-item"
          onClick={() => {
            sortAscOrder(), setToggle(false);
          }}
        >
          Цена <i className="bi bi-arrow-down"></i>
        </button>
        <button
          className="dropdown-item"
          onClick={() => {
            sortDescOrder(), setToggle(false);
          }}
        >
          Цена <i className="bi bi-arrow-up"></i>
        </button>
        <button
          className="dropdown-item"
          onClick={() => {
            sortAscOrderByName(), setToggle(false);
          }}
        >
          По име (А-Я)
        </button>
        <button
          className="dropdown-item"
          onClick={() => {
            sortDescOrderByName(), setToggle(false);
          }}
        >
          По име (Я-А)
        </button>
      </div>
    </div>
  );
}
