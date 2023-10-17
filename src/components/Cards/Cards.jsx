import SortedData from "../SortedData/SortedData";
import FilterProductsBy from "../FilterProductsBy/FilterProductsBy";
import SortProductsBy from "../SortProductsBy/SortProductsBy";
import { fetchData } from "../../helpers/helpers";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Cards() {
  const [peopleByPrice, setPeopleByPrice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    setPage((prev) => prev + 1);
    try {
      const res = await fetchData(
        // apiUrl, type, order
        // `${apiUrl}?page=${page + 1}&orderby=${type}&order=${order}`
        `https://greet.bg/wp-json/wc/store/products?page=${page + 1}`
      );
      setPeopleByPrice((prev) => [...prev, ...res]);
    } catch (error) {
      console.error(error);
    }
  };

  const sortAsc = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData(
        `https://greet.bg/wp-json/wc/store/products?page=${page}&orderby=price&order=asc`
      );
      setPeopleByPrice(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    loadMore("https://greet.bg/wp-json/wc/store/products", "price", "asc");
  };

  const sortDesc = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData(
        `https://greet.bg/wp-json/wc/store/products?page=1&orderby=price&order=desc`
      );
      setPeopleByPrice(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const sortAscByName = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData(
        `https://greet.bg/wp-json/wc/store/products?page=${page}&orderby=title&order=asc`
      );
      setPeopleByPrice(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const sortDescByName = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData(
        `https://greet.bg/wp-json/wc/store/products?page=${page}&orderby=title&order=desc`
      );
      setPeopleByPrice(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchDataFromDefaultLink() {
      try {
        const res = await fetchData(
          `https://greet.bg/wp-json/wc/store/products?page=${page}`
        );
        setPeopleByPrice(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchDataFromDefaultLink();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6 col-lg-1 mb-3">
            <SortProductsBy
              ascOrder={sortAsc}
              descOrder={sortDesc}
              ascOrderByName={sortAscByName}
              descOrderByName={sortDescByName}
            />
          </div>
          <div className="col-6 col-lg-1 mb-3">
            <FilterProductsBy />
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SortedData data={peopleByPrice} />
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-primary mb-1" onClick={loadMore}>
              Виж още
            </button>
          </div>
        </>
      )}
    </>
  );
}
