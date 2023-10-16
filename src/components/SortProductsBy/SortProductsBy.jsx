/* eslint-disable react/prop-types */
import { useState } from "react";

export default function SortProductsBy({
  ascOrder,
  descOrder,
  ascOrderByName,
  descOrderByName,
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
            ascOrder(), setToggle(false);
          }}
        >
          Цена <i className="bi bi-arrow-down"></i>
        </button>
        <button
          className="dropdown-item"
          onClick={() => {
            descOrder(), setToggle(false);
          }}
        >
          Цена <i className="bi bi-arrow-up"></i>
        </button>
        <button
          className="dropdown-item"
          onClick={() => {
            ascOrderByName(), setToggle(false);
          }}
        >
          По име (А-Я)
        </button>
        <button
          className="dropdown-item"
          onClick={() => {
            descOrderByName(), setToggle(false);
          }}
        >
          По име (Я-А)
        </button>
      </div>
    </div>
  );
}
