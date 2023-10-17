import { useState } from "react";

export default function Dropdown({ title, items, onItemClick }) {
  const [toggle, setToggle] = useState(false);

  const dropdownMenuToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        onClick={dropdownMenuToggle}
      >
        {title}
      </button>
      <div className={`dropdown-menu ${toggle ? "show" : ""}`}>
        {items.map((item) => (
          <button
            className="dropdown-item"
            key={item.id}
            onClick={() => {
              onItemClick(item.data);
              setToggle(false);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
