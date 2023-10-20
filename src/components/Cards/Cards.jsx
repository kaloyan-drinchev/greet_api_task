import SortedData from "../SortedData/SortedData";
import { getProducts, getAllCategories } from "../../helpers/helpers";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Dropdown from "../Dropdown/Dropdown";

export default function Cards() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      name: (
        <>
          Цена <i className="bi bi-arrow-up"></i>
        </>
      ),
      data: { type: "price", sort: "asc", status: false },
    },
    {
      id: 2,
      name: (
        <>
          Цена <i className="bi bi-arrow-down"></i>
        </>
      ),
      data: { type: "price", sort: "desc", status: false },
    },
    {
      id: 3,
      name: "Име (А-Я)",
      data: { type: "title", sort: "asc", status: false },
    },
    {
      id: 4,
      name: "Име (Я-А)",
      data: { type: "title", sort: "desc", status: false },
    },
    {
      id: 5,
      name: "Начално",
      data: { type: "", sort: "", status: false },
    },
  ]);
  const [categories, setCategories] = useState([]);

  const loadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    setPage((prev) => prev + nextPage);
    try {
      const res = await getProducts(nextPage, type, sort);
      setProducts([...products, ...res]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const renderProducts = async () => {
      try {
        const res = await getProducts("1", type, sort);
        const allCategories = await getAllCategories(res);
        setCategories(allCategories);
        setProducts(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    renderProducts();
  }, [type, sort]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-2 mb-3 mt-3">
            <Dropdown
              title="Сортиране"
              items={items}
              onItemClick={(data) => {
                if (!data.status) {
                  {
                    setProducts([]);
                  }
                  setSort(data.sort);
                  setType(data.type);
                  setItems((prevItems) => {
                    return prevItems.map((item) => ({
                      ...item,
                      data: {
                        ...item.data,
                        status: item.data === data ? true : false,
                      },
                    }));
                  });
                }
              }}
            />
          </div>
          <div className="col-12 col-lg-2 mb-3 mt-3">
            <Dropdown
              title="Категории"
              items={categories}
              onItemClick={(data) => {
                setProducts((prevProducts) => {
                  const filterProducts = prevProducts.filter((product) => {
                    return product.categories.some(
                      (category) => category.name === data.name
                    );
                  });
                  return filterProducts;
                });
                setCategories((prevCategories) => {
                  return prevCategories.map((category) => ({
                    ...category,
                    data: {
                      ...category.data,
                      status: category.data === data ? true : false,
                    },
                  }));
                });
              }}
            />
          </div>
        </div>
      </div>
      <SortedData data={products} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-primary mb-3" onClick={loadMore}>
            Виж още
          </button>
        </div>
      )}
    </>
  );
}
