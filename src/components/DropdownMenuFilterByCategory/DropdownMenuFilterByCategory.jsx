import { useEffect, useState } from "react";
import { getAllCategories } from "../../helpers/helpers";

export default function DropdownMenuFilterByCategory() {
  const [toggle, setToggle] = useState(false);
  const [categories, setCategories] = useState([]);

  const dropdownMenuToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    getCategories();
  }, []);
  return (
    <div className={`dropdown ${toggle ? "show" : ""}`}>
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        onClick={dropdownMenuToggle}
        id="dropdownMenuButton"
      >
        Сортирай по Категория
      </button>
      <div
        className={`dropdown-menu ${toggle ? "show" : ""} p-1 transparent-bg`}
      >
        {categories &&
          categories.map((category, index) => (
            <div key={index}>
              <button className="rounded mb-1 dropdown-item">{category}</button>
            </div>
          ))}
      </div>
    </div>
  );
}
