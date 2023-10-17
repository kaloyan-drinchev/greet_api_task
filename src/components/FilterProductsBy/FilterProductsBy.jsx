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
          categories.map((category, index) => (
            <button
              key={index}
              className="rounded mb-1 dropdown-item text-black"
              onClick={() => setToggle(false)}
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
}
