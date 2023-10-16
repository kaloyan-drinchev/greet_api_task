import { useEffect, useState } from "react";
import { getAllCategories } from "../../helpers/helpers";

export default function FilterProductsBy() {
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
        className="btn btn-primary dropdown-toggle ms-4"
        type="button"
        onClick={dropdownMenuToggle}
        id="dropdownMenuButton"
      >
        Категории
      </button>
      <div className={`dropdown-menu ${toggle ? "show" : ""} p-1`}>
        {categories &&
          categories.map((category) => (
            <button
              key={category.id}
              className="rounded mb-1 dropdown-item"
              onClick={() => setToggle(false)}
            >
              {category.name}
            </button>
          ))}
      </div>
    </div>
  );
}
