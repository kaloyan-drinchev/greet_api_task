import SortedData from "../SortedData/SortedData";
import FilterProductsBy from "../FilterProductsBy/FilterProductsBy";
import SortProductsBy from "../SortProductsBy/SortProductsBy";
import { fetchData } from "../../helpers/helpers";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Cards() {
  const [peopleByPrice, setPeopleByPrice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortAsc = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData(
        "https://greet.bg/wp-json/wc/store/products?orderby=price&order=asc"
      );
      setPeopleByPrice(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const sortDesc = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData(
        "https://greet.bg/wp-json/wc/store/products?orderby=price&order=desc"
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
        "https://greet.bg/wp-json/wc/store/products?orderby=title&order=asc"
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
        "https://greet.bg/wp-json/wc/store/products?orderby=title&order=desc"
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
          "https://greet.bg/wp-json/wc/store/products?page=1"
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

      {isLoading ? <LoadingSpinner /> : <SortedData data={peopleByPrice} />}
    </>
  );
}
