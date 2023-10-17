import SortedData from "../SortedData/SortedData";
import FilterProductsBy from "../FilterProductsBy/FilterProductsBy";
import { getProducts } from "../../helpers/helpers";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Dropdown from "../Dropdown/Dropdown";

export default function Cards() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");

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
          <div className="col-6 col-lg-1 mb-3">
            <Dropdown
              title="Сортиране"
              items={[
                {
                  id: 1,
                  name: (
                    <>
                      Цена <i className="bi bi-arrow-down"></i>
                    </>
                  ),
                  data: { type: "price", sort: "asc" },
                },
                {
                  id: 2,
                  name: (
                    <>
                      Цена <i className="bi bi-arrow-up"></i>
                    </>
                  ),
                  data: { type: "price", sort: "desc" },
                },
                {
                  id: 3,
                  name: "Име (А-Я)",
                  data: { type: "title", sort: "asc" },
                },
                {
                  id: 4,
                  name: "Име (Я-А)",
                  data: { type: "title", sort: "desc" },
                },
              ]}
              onItemClick={(data) => {
                setSort(data.sort);
                setType(data.type);
              }}
            />
          </div>
          <div className="col-6 col-lg-1 mb-3">
            <FilterProductsBy />
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
